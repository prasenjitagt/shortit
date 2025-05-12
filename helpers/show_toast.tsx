import { toast } from "sonner";


export function showToast(message: string) {
  toast(
    <div className="text-base">{message}</div>,

    {
      duration: 2000,
    }
  );
}
