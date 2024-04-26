import localFont from "next/font/local";
import "./globals.css";
import Favicon from "../../public/favicon.ico";
import { Providers } from "../../providers";

const iranSans_light = localFont({
  src: [{ path: "../../public/fonts/iranSans/IRANSansX-Light.woff" }],
  variable: "--font_1",
});
const iranSans_regular = localFont({
  src: [{ path: "../../public/fonts/iranSans/IRANSansX-Regular.woff" }],
  variable: "--font_2",
});
const iranSans_medium = localFont({
  src: [{ path: "../../public/fonts/iranSans/IRANSansX-Medium.woff" }],
  variable: "--font_3",
});
const iranSans_bold = localFont({
  src: [{ path: "../../public/fonts/iranSans/IRANSansX-Bold.woff" }],
  variable: "--font_4",
});


export const metadata = {
  icons: [{ rel: "icon", url: Favicon.src }],
  title: "توسعه تجاری",
  description: "شرکت توسعه تجاری",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body
        className={`${iranSans_regular.variable} ${iranSans_light.variable} ${iranSans_medium.variable} ${iranSans_bold.variable}  rtl `}
      >
           <Providers>


          {children}

        </Providers>
      </body>
    </html>
  );
}
