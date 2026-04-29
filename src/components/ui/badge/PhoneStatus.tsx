import { UserInfo } from "@/types/profile";

interface PhoneStatusProps {
    userInfo?: UserInfo;
}

const PhoneStatus: React.FC<PhoneStatusProps> = ({ userInfo }) => {
    return (
        <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userInfo?.profile.phone_number}
            </p>
            {userInfo?.profile.phone_verified ? (
                <span className="inline-flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            ) : (
                <span className="inline-flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            )}
        </div>
    );
};

export default PhoneStatus;
