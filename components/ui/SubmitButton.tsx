import React from 'react';
import { ButtonProps as ShadcnButtonProps, Button } from "@/components/ui/button"; // Renamed ButtonProps to avoid conflict
import Image from 'next/image'; // Make sure Image is imported if you're using it

interface SubmitButtonProps { // Renamed interface to avoid conflict with ButtonProps from shadcn
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: SubmitButtonProps) => {
    return (
        <Button type="submit" className={className ?? 'shad-primary-btn w-full'} disabled={isLoading}>
            {isLoading ? (
                <div className="flex items-center gap-4 justify-center">
                    <Image
                        src="/assets/icons/loading.svg"
                        height={24}
                        width={24}
                        alt="loader"
                        className="animate-spin"
                    />
                    Loading ...
                </div>
            ):children}
        </Button>
    )
};


export default SubmitButton;