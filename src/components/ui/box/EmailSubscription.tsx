"use client";
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../button/Button';
import { toast } from '@/hooks/use-toast';

interface EmailSubscriptionProps {
    className?: string;
    onSubmit?: (email: string) => Promise<void> | void;
}

const emailSchema = z.object({
    email: z.string().email("login.errors.invalidEmail"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const EmailSubscription: FC<EmailSubscriptionProps> = ({ className = '', onSubmit }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
    });

    const onSubmitHandler = async (values: EmailFormValues) => {
        const { dismiss } = toast({
            variant: "loading",
            title: t("messages.loading"),
            position: "bottom-right",
        });
        try {
            await onSubmit?.(values.email);
            reset();
        } catch (error) {
            setError("root", { message: t("footer.submitError") });
        } finally {
            dismiss();
        }
    };

    return (
        <div className={`flex flex-col w-full max-w-md mx-auto ${className}`}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                {t("footer.subscribeTitle")}
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4" noValidate>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='col-span-2'>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className={`mt-1 w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none`}
                            placeholder={t("footer.emailPlaceholder")}
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                    </div>
                    <div>
                        <Button type="submit" disabled={isSubmitting} variant="primary" className='h-full'>
                            {isSubmitting ? t("actions.submitting") : t("actions.submit")}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EmailSubscription;