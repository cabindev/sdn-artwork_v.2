import { Inter } from "next/font/google";
import "./globals.css";
var inter = Inter({ subsets: ["latin"] });
export var metadata = {
    metadataBase: new URL("https://app-info.healthypublicspaces.com/"),
    // title: "sdn-workspaces",
    title: {
        default: "Blog for Organization",
        template: '%s | Blog for Organization'
    },
    description: "Blog for Organization SDN Workspaces",
    openGraph: {
        title: "SDN Workspaces",
        description: "Blog for Organization SDN Workspaces",
        type: "website",
        locale: "en_US",
        url: "https://app-info.healthypublicspaces.com",
        siteName: "DevBlook"
    },
};
export default function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">

      <body className={inter.className}>
        {children}
      </body>
    </html>);
}
