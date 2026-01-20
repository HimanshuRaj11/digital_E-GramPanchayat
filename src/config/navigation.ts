export interface NavItem {
    label: string;
    href: string;
}

export type UserRole = 'admin' | 'officer' | 'staff' | 'citizen' | 'guest';

export const PUBLIC_NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export const CITIZEN_NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Services', href: '/services' },
    { label: 'My Applications', href: '/dashboard/applications' },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
    { label: 'Admin Panel', href: '/admin' },
    { label: 'Services', href: '/admin/services' },
    { label: 'Applications', href: '/admin/applications' },
    { label: 'Users', href: '/admin/users' },
];

export const getNavItemsByRole = (role?: string): NavItem[] => {
    switch (role) {
        case 'admin':
        case 'officer':
        case 'staff':
            return ADMIN_NAV_ITEMS;
        case 'citizen':
            return CITIZEN_NAV_ITEMS;
        default:
            return PUBLIC_NAV_ITEMS;
    }
};
