import { FileText } from "lucide-react";
import TicketFormFields from "./TicketFormFields";

export default function IssueInformation(props) {
  return (
    <div className="border-b border-stone-100 p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
          <FileText size={20} />
        </div>

        <div>
          <h2 className="font-bold text-stone-900">
            Issue information
          </h2>
          <p className="mt-1 text-xs text-stone-500">
            Fields marked with * are required.
          </p>
        </div>
      </div>

      <div className="mt-7">
        <TicketFormFields {...props} />
      </div>
    </div>
  );
}