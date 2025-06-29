"use client"
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function PopupOffer() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000); // بعد 3 ثوانٍ

        return () => clearTimeout(timer);
    }, []);

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
                <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold mb-2 text-center text-red-600">🎉 عرض خاص!</h2>
                <img src="/SFDGHN.png" alt="s" />

            </div>
        </div>
    );
}
