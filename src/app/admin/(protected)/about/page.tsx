
import { getProfile } from "@/actions/profile.actions";
import ProfileForm from "@/components/admin/ProfileForm";
import { UserCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminAboutPage() {
    const { data: profile } = await getProfile();

    return (
        <div className="p-8 text-amber-100">
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-full bg-amber-900/20 text-amber-600">
                        <UserCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-amber-100">Edit Profile</h1>
                        <p className="text-amber-700">Manage your About page content</p>
                    </div>
                </div>

                <ProfileForm initialData={profile} />
            </div>
        </div>
    );
}
