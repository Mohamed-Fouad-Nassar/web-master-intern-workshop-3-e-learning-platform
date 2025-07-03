import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function SubmitBtn({
  className = "",
  disabled,
  children,
  ...rest
}) {
  return (
    <Button
      type="submit"
      variant={"outline"}
      className={`w-fit flex items-center !p-4 gap-4 font-bold ${className}`}
      disabled={disabled}
      {...rest}
    >
      {disabled ? (
        <>
          {children} <Loader2 className="animate-spin size-6" />
        </>
      ) : (
        children || "Submit"
      )}
    </Button>
  );
}
