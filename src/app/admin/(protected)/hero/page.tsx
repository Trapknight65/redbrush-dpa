import { getProfile } from "@/actions/profile.actions";
import HeroForm from "@/components/admin/HeroForm";
import { Film } from "lucide-react";

export default async function AdminHeroPage() {
    const { data: profile } = await getProfile();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-nami-wood/30">
                <div className="w-12 h-12 bg-nami-tangerine/10 rounded-lg flex items-center justify-center border border-nami-tangerine/20">
                    <Film className="w-6 h-6 text-nami-tangerine" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-nami-wood-dark">Hero Management</h1>
                    <p className="text-nami-wood-dark/60">Customize the homepage interactions and media</p>
                </div>
            </div>

            <HeroForm initialData={profile} />
        </div>
    );
}
