/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StepChildProps } from "../../types/programFormData";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  BiCloudUpload, 
  BiCheckCircle, 
  BiFile, 
  BiChevronDown, 
  BiChevronUp,
  BiLoaderAlt,
  BiErrorCircle
} from "react-icons/bi";

// Import the services we created
import { getProgramRequirements, uploadRequirementDocument } from "../../services/api/applicationService";

// --- Types ---
interface Requirement {
  requirement_id: number; // Note: API returns 'requirement_id'
  title: string;
  description: string;
  note?: string;
  is_mandatory: boolean; // Note: API returns 'is_mandatory'
  status: 'pending' | 'uploaded'; 
  document?: {
    file_url: string;
    issuer?: string;
    date_issued?: string;
    expiry_date?: string;
  };
}

interface DocPayload {
  file: File | null;
  issuer: string;
  dateIssued: string;
  expiryDate: string;
}

const Documents: React.FC<StepChildProps> = ({ formData, setFormData }) => {
  const { slug } = useParams<{ slug: string }>(); // Get slug from URL
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 1. Fetch Requirements on Mount
  useEffect(() => {
    if (!slug) {
      setError("Program identifier (slug) is missing.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getProgramRequirements(slug);
        console.log('fetched data', data.data.requirements);
        if(!data.data.requirements) return;
        setRequirements(data.data.requirements);

        // Sync existing server documents with parent formData 
        // This ensures the "Next" button works if user refreshes the page
        const existingDocs = data.data.requirements.filter((r: any) => r.status === 'uploaded' && r.document)
          .reduce((acc: any, r: any) => ({
            ...acc,
            [r.requirement_id]: r.document
          }), {});

        if (Object.keys(existingDocs).length > 0) {
          setFormData((prev: any) => ({
            ...prev,
            documents: { ...prev.documents, ...existingDocs }
          }));
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load program requirements.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, setFormData]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 2. Handle the Upload Logic
  const handleUpload = async (reqId: number, payload: DocPayload): Promise<boolean> => {
    if (!payload.file) return false;

    try {
      // Call API
      const response = await uploadRequirementDocument(
        reqId, 
        payload.file, 
        {
          issuer: payload.issuer,
          dateIssued: payload.dateIssued,
          expiryDate: payload.expiryDate
        }
      );

      const uploadedDoc = response.data;

      // Update Local List State
      setRequirements((prev) => prev.map((req) => {
        if (req.requirement_id === reqId) {
          return {
            ...req,
            status: 'uploaded',
            document: {
              file_url: uploadedDoc.fileUrl,
              issuer: uploadedDoc.issuer,
              date_issued: uploadedDoc.dateIssued,
              expiry_date: uploadedDoc.expiryDate
            }
          };
        }
        return req;
      }));

      // Update Parent FormData (For validation/Next button)
      setFormData((prev: any) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [reqId]: uploadedDoc
        }
      }));

      return true; // Success
    } catch (err: any) {
      alert(err.message || "Upload failed. Please try again.");
      return false; // Failed
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <BiLoaderAlt className="animate-spin w-8 h-8 mb-2" />
        <p className="text-xs">Loading requirements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-500">
        <BiErrorCircle className="w-8 h-8 mb-2" />
        <p className="text-sm">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-xs underline">Try Again</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-hdark-500">Required Documents</h3>
        <p className="text-sm text-gray-400">
          Please provide the details and documents for each requirement below.
        </p>
      </div>

      <div className="space-y-4">
        {requirements.map((req) => (
          <RequirementItem 
            key={req.requirement_id} 
            requirement={req} 
            isOpen={expandedId === req.requirement_id}
            onToggle={() => toggleExpand(req.requirement_id)}
            onUpload={handleUpload}
          />
        ))}
      </div>
    </div>
  );
};

// --- Sub-Component ---
const RequirementItem = ({ 
  requirement, 
  isOpen, 
  onToggle,
  onUpload
}: { 
  requirement: Requirement, 
  isOpen: boolean, 
  onToggle: () => void,
  onUpload: (id: number, payload: DocPayload) => Promise<boolean>
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize state from existing document if available
  const [localData, setLocalData] = useState<DocPayload>({
    file: null,
    issuer: requirement.document?.issuer || "",
    // Handle simplified date string extraction if needed
    dateIssued: requirement.document?.date_issued ? requirement.document.date_issued.split('T')[0] : "",
    expiryDate: requirement.document?.expiry_date ? requirement.document.expiry_date.split('T')[0] : "",
  });

  const hasDoc = requirement.status === 'uploaded';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalData({ ...localData, file: e.target.files[0] });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const onSaveClick = async () => {
    setIsUploading(true);
    const success = await onUpload(requirement.requirement_id, localData);
    setIsUploading(false);
    
    if (success) {
      onToggle(); // Close accordion on success
    }
  };

  return (
    <div className={`border rounded-xl transition-all duration-300 ${
      hasDoc ? "border-green-200 bg-green-50/30" : "border-gray-200 bg-white"
    }`}>
      {/* Header */}
      <div 
        onClick={onToggle}
        className="flex items-center justify-between p-4 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            hasDoc ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
          }`}>
            {hasDoc ? <BiCheckCircle size={24} /> : <BiFile size={20} />}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-hdark-500 text-sm">{requirement.title}</h4>
              {requirement.is_mandatory && (
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                  Mandatory
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{requirement.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasDoc && (
            <span className="text-xs font-medium text-green-600 hidden sm:block">Completed</span>
          )}
           {isOpen ? <BiChevronUp className="text-gray-400" /> : <BiChevronDown className="text-gray-400" />}
        </div>
      </div>

      {/* Expanded Form */}
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-100 mt-2 animate-in fade-in slide-in-from-top-2">
          
          {/* File Upload Zone */}
          <div 
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {localData.file ? (
              <div className="flex items-center gap-2 text-green-600">
                <BiFile size={24} />
                <span className="text-sm font-medium">{localData.file.name}</span>
                <span className="text-xs text-gray-400 ml-2">(Click to change)</span>
              </div>
            ) : requirement.document?.file_url ? (
               <div className="flex items-center gap-2 text-green-600">
                <BiCheckCircle size={24} />
                <span className="text-sm font-medium">File already uploaded</span>
                <span className="text-xs text-gray-400 ml-2">(Click to replace)</span>
              </div>
            ) : (
              <>
                <BiCloudUpload className="text-gray-400 w-8 h-8 group-hover:scale-110 transition-transform mb-2" />
                <p className="text-sm text-gray-500 font-medium">Click to upload document</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max 5MB)</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              disabled={isUploading}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          {/* Metadata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Issuing Authority (Optional)</label>
              <input 
                type="text"
                name="issuer"
                value={localData.issuer}
                onChange={handleTextChange}
                disabled={isUploading}
                placeholder="e.g. NIMC, University of Lagos"
                className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date Issued</label>
              <input 
                type="date"
                name="dateIssued"
                value={localData.dateIssued}
                onChange={handleTextChange}
                disabled={isUploading}
                className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date (If applicable)</label>
              <input 
                type="date"
                name="expiryDate"
                value={localData.expiryDate}
                onChange={handleTextChange}
                disabled={isUploading}
                className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
             <button 
               type="button"
               onClick={onToggle}
               disabled={isUploading}
               className="px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
             >
               Cancel
             </button>
             <button 
               type="button"
               onClick={onSaveClick}
               disabled={(!localData.file && !requirement.document?.file_url) || isUploading}
               className="px-6 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
             >
               {isUploading && <BiLoaderAlt className="animate-spin" />}
               {isUploading ? 'Uploading...' : 'Save & Attach'}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;