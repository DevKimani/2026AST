import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import GetHelp from "@/pages/GetHelp";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import GetInvolved from "@/pages/GetInvolved";
import Volunteer from "@/pages/Volunteer";
import Donate from "@/pages/Donate";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/get-help" element={<GetHelp />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
