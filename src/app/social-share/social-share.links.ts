import { SocialShareLink } from "app/global-types";

export default (dataToShare: string): SocialShareLink[] => [
    {
        outlet: "WhatsApp",
        href: encodeURI(`https://api.whatsapp.com/send?text=${dataToShare.replace('\\n', '%0a‎')}`),
        label: "Share via Whatsapp",
        icon: 'whatsapp'
    },
    {
        outlet: "Gmail",
        href: encodeURI(`https://mail.google.com/mail/u/0/?view=cm&to&body=${dataToShare}%0A&bcc&cc&fs=1&tf=1`),
        label: "Share via Gmail",
        icon: 'email'
    },
    {
        outlet: "Facebook",
        href: encodeURI(`https://www.facebook.com/sharer.php?u=${location.href}&quote=${dataToShare}`),
        label: "Share on Facebook",
        icon: 'facebook'
    },
    {
        outlet: "Twitter",
        href: encodeURI(`https://twitter.com/intent/tweet?text=Catholic%20Daily%20Readings&url=${location.href}`),
        label: "Share on Twitter",
        icon: 'share'
    },
    {
        outlet: "Telegram",
        href: encodeURI(`https://t.me/share/url?url=${location.href}&text=${dataToShare}`),
        label: "Share on Telegram",
        icon: 'telegram'
    }
];