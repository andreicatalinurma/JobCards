import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="fixed bottom-0 bg-slate-400 w-screen p-3">
        <p className="flex justify-center text-sm font-semibold">© {year} Job Cards</p>
    </div>
  );
}
export default Footer;