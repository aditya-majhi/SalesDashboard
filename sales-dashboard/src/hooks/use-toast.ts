import { toast } from 'sonner';

export const useToast = () => {
    return {
        toast: {
            success: (message: string) => toast.success(message),
            error: (message: string) => toast.error(message),
            info: (message: string) => toast.info(message),
            warning: (message: string) => toast.warning(message),
            promise: (promise: Promise<any>, messages: { loading: string; success: string; error: string }) => {
                return toast.promise(promise, messages);
            }
        }
    };
};

export { toast };