import ProfileMenu from '@/layouts/profile-menu';
import LanguagePicker from '@/layouts/hydrogen/language-switcher';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto flex items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <LanguagePicker />
      <ProfileMenu />
    </div>
  );
}
