interface ValidationErrorProps {
  validationErrors: { [key: string]: string[] };
  field: string;
  style?: object
  className?: string
}
const ValidationError = ({ validationErrors, field, style, className }: ValidationErrorProps) => {
  // console.log(validationErrors);
  return (
    <>
      {validationErrors &&
        validationErrors[field] &&
        validationErrors[field].map((err, index) => {
          return (
           
            <span key={index} className={`${className || ""} text-red-400`} style={style}>
              {err}
            </span>
           
          );
        })}
    </>
  );
};

export default ValidationError;
