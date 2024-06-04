import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
var inter = Inter({ subsets: ["latin"] });
export var metadata = {
    metadataBase: new URL("https://app-info.healthypublicspaces.com/"),
    title: {
        default: "Workspaces | sdnthailand",
        template: '%s | Workspaces | sdnthailand'
    },
    description: "Blog | sdnthailand SDN-Workspaces",
    openGraph: {
        title: "SDN Workspaces",
        description: "Workspaces | sdnthailand SDN-Workspaces",
        type: "website",
        locale: "en_US",
        url: "https://app-info.healthypublicspaces.com",
        siteName: "SDN-Workspaces"
    },
};
export default function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>);
}
