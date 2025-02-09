"use client";

import { useState } from "react";
import ButtonClient from "./Button";

interface SellerOnboardProps {
    isSeller: boolean;
    isOnboarded: boolean;
}

export default function SellerOnboard({}: // isSeller,
// isOnboarded,
SellerOnboardProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startOnboarding = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/connect/onboard", {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error?.includes("account has been rejected")) {
                    throw new Error(
                        "Le service n'est pas encore disponible. Veuillez réessayer plus tard."
                    );
                }
                throw new Error(data.error || "Failed to start onboarding");
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("No redirect URL received");
            }
        } catch (error) {
            console.error("Onboarding error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue. Veuillez réessayer plus tard."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Devenir Vendeur</h2>
                <p className="text-gray-600">
                    Configurez votre compte vendeur pour commencer à vendre sur
                    notre plateforme.
                </p>
                {error?.includes("pas encore disponible") ? (
                    <p className="text-sm text-amber-600">
                        Notre service d&apos;inscription des vendeurs est en cours de configuration. Merci de votre patience.
                    </p>
                ) : (
                    <div className="flex justify-center">
                        <ButtonClient
                            type="button"
                            label="Devenir vendeur"
                            onClick={startOnboarding}
                            isLoading={loading}
                            loadingLabel="Chargement..."
                        >
                            Devenir vendeur
                        </ButtonClient>
                    </div>
                )}
            </div>
        </div>
    );
}
