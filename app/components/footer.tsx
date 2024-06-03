// components/Footer.js

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full ">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} sdnthailand. All rights reserved.
        </p>
        <p>Power by Yellowdev</p>
        <p className="text-sm">
          Follow us on:
          {/* <a href="https://twitter.com/yourcompany" className="ml-2 text-blue-400 hover:text-blue-600">Twitter</a>, */}
          <a href="https://www.facebook.com/sdnthailand" className="ml-2 text-blue-400 hover:text-blue-600">Facebook</a>,
          {/* <a href="https://instagram.com/yourcompany" className="ml-2 text-blue-400 hover:text-blue-600">Instagram</a> */}
        </p>
      </div>
    </footer>
  );
}

  