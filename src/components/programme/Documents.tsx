import type { StepChildProps } from "../../types/programFormData";
import { useRef } from "react";
import { BiCloudUpload, BiFile, BiX } from "react-icons/bi";

const Documents: React.FC<StepChildProps> = ({ formData, setFormData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev: any) => ({
        ...prev,
        documents: [...prev.documents, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      documents: prev.documents.filter((_: any, i: number) => i !== index),
    }));
  };
  return (
    <>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-hdark-500 mb-1">
            Required Documents
          </h3>
          <p className="text-xs text-gray-400 mb-6 text-center w-full">
            Please upload clear copies of the required documents
          </p>

          {/* Upload Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-hgrey-500 rounded-xl md:p-8 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-hgrey-200 transition-all group">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BiCloudUpload className="text-[#22c55e] w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-hdark-500">
                  Click to upload
                </p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase">
                  PDF, JPG, PNG up to 10MB
                </p>
              </div>
            ))}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>

        {/* Uploaded List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">
            Uploaded Documents
          </h3>
          {formData?.documents?.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-lg group hover:border-hgreen-500 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-gray-100 rounded text-green-600">
                  <BiFile size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-hdark-500">
                    {file.name || `Document ${index + 1}`}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase">
                    {file.type.split("/")[1] || "File"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-red-500">
                <BiX size={20} />
              </button>
            </div>
          ))}

          {formData?.documents?.length === 0 && (
            <p className="text-xs text-gray-300 italic">
              No documents uploaded yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Documents;
