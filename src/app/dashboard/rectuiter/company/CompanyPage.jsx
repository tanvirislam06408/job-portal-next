"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Modal,
  Avatar,
  Chip,
  useOverlayState,
  toast,
} from "@heroui/react";
import {
  FaBuilding,
  FaEdit,
  FaGlobe,
  FaMapMarkerAlt,
  FaPlus,
  FaUpload,
  FaUsers,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { createCompany } from "@/lib/actions/company";
import { getCompanyData } from "@/lib/api/company";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Marketing",
  "Entertainment",
  "Real Estate",
  "Other",
];

const EMPLOYEE_RANGES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

export default function CompanyPage({recruiter}) {
  const modalState = useOverlayState();
  const [companies, setCompanies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState(null);
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [employeeRange, setEmployeeRange] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");

  const [uploading, setUploading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Simulated status control (for dev review of Approved/Rejected/Pending styling)
  const [simulatedStatus, setSimulatedStatus] = useState("pending");

  // Prefill modal fields for editing (accepts index)
  const handleOpenEdit = (index) => {
    const c = companies[index];
    if (!c) return;
    setIsEdit(true);
    setSelectedIndex(index);
    setName(c.name);
    setIndustry(c.industry);
    setWebsite(c.website?.replace("https://", "") || "");
    setLocation(c.location);
    setEmployeeRange(c.employeeRange);
    setLogoUrl(c.logo);
    setDescription(c.description);
    modalState.open();
  };

  const handleOpenRegister = () => {
    setIsEdit(false);
    setSelectedIndex(null);
    setName("");
    setIndustry(null);
    setWebsite("");
    setLocation("");
    setEmployeeRange(null);
    setLogoUrl("");
    setDescription("");
    modalState.open();
  };



// get the company profile
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyData(recruiter.id);
        if (data) {
          setCompanies(Array.isArray(data) ? data : [data]);
          setSimulatedStatus((data && data.status) || (Array.isArray(data) && data[0]?.status) || "pending");
        }
      } catch (error) {
        console.error("Failed to fetch company data:", error);
        toast.error("Error loading company profile.");
      }
    };

    fetchCompany();
  }, []);
  






  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size and format
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload an image file (PNG, JPG, or JPEG).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
      if (!apiKey || apiKey === "YOUR_IMGBB_KEY") {
        const previewUrl = URL.createObjectURL(file);
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLogoUrl(previewUrl);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        console.error("imgbb upload error:", data);
        alert("Failed to upload image: " + (data.error?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !industry || !website || !location || !employeeRange || !description) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    const fullWebsite = website.startsWith("http") ? website : `https://${website}`;
    const timestamp = new Date().toISOString();

    const companyData = {
      recruiterId: recruiter?.id,
      name,
      industry,
      website: fullWebsite,
      location,
      employeeRange,
      logo: logoUrl || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150", // fallback default
      status: isEdit ? companies[selectedIndex]?.status : "pending",
      createdAt: isEdit ? companies[selectedIndex]?.createdAt : timestamp,
      updatedAt: timestamp,
    };



    const res = await createCompany(companyData);
   

    if (res.acknowledged) {
      toast.success("Company created successfully");
    } else {
      toast.warning(res);
    }

    if (isEdit && selectedIndex !== null) {
      setCompanies((prev) => prev.map((it, i) => (i === selectedIndex ? companyData : it)));
    } else {
      setCompanies((prev) => [companyData, ...prev]);
      setSimulatedStatus("pending");
    }
    modalState.close();
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "approved":
        return {
          className: "border-emerald-500/20 text-emerald-400 bg-emerald-950/20",
          icon: <FaCheckCircle className="text-emerald-400 mr-1.5" />,
          label: "Approved",
        };
      case "rejected":
        return {
          className: "border-rose-500/20 text-rose-400 bg-rose-950/20",
          icon: <FaTimesCircle className="text-rose-400 mr-1.5" />,
          label: "Rejected",
        };
      default:
        return {
          className: "border-yellow-500/20 text-yellow-400 bg-yellow-950/20",
          icon: <FaExclamationCircle className="text-yellow-400 mr-1.5" />,
          label: "Pending Review",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Radial Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Company Management</h1>

        {/* --- EMPTY STATE CARD --- */}
        {!companies || companies.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="bg-zinc-950/40 border border-zinc-850 backdrop-blur-xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6 rounded-3xl shadow-2xl hover:border-violet-500/20 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shadow-inner">
                <FaBuilding size={28} className="text-zinc-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">No Company Registered</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                  Register your business details to start publishing job listings and recruiting talent on HireLoop.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white hover:bg-zinc-200 text-black font-semibold rounded-2xl px-6 py-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 mt-2"
                onPress={handleOpenRegister}
              >
                <FaPlus className="text-xs" /> Register Company
              </Button>
            </Card>
          </div>
        ) : (
          companies.map((company, idx) => (
            /* --- COMPANY PROFILE VIEW --- */
            <Card key={company._id ?? idx} className="bg-zinc-950/40 border border-zinc-850 backdrop-blur-xl rounded-3xl overflow-hidden mb-6 shadow-2xl hover:border-violet-500/10 transition-all duration-500">
            {/* Header / Cover Graphic */}
              <div className="relative h-36 bg-gradient-to-r from-violet-950/40 via-indigo-950/40 to-zinc-900/60 border-b border-zinc-900">
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Chip className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${getStatusDetails(company.status || simulatedStatus).className}`}>
                  <Chip.Label className="flex items-center">
                    {getStatusDetails(company.status || simulatedStatus).icon}
                    {getStatusDetails(company.status || simulatedStatus).label}
                  </Chip.Label>
                </Chip>
              </div>
            </div>

            {/* Profile Info Body */}
            <div className="relative px-8 pb-8 pt-0">
              {/* Overlapping Avatar */}
              <div className="absolute -top-12 left-8 p-1 bg-zinc-950 border border-zinc-850 rounded-3xl w-24 h-24 shadow-xl overflow-hidden flex items-center justify-center">
                <Avatar className="w-full h-full rounded-2xl">
                  <Avatar.Image src={company.logo} alt={company.name} className="object-cover" />
                  <Avatar.Fallback className="bg-zinc-800 text-zinc-300 text-2xl font-extrabold flex items-center justify-center w-full h-full">
                    {company?.name?.slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </div>

              {/* Action Buttons & Simulators */}
              <div className="pt-16 flex flex-wrap items-center justify-between gap-6 border-b border-zinc-900 pb-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">{company.name}</h2>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-violet-400 bg-violet-950/30 border border-violet-800/30 rounded-full">
                    {company.industry}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* SIMULATOR (DEV PREVIEW TOOL) */}
                  <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-2 flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-2">Simulate Status:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setCompanies(prev => prev.map((it, i) => (i === idx ? { ...it, status: "pending" } : it)));
                        }}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${company.status === "pending"
                          ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500"
                          : "text-zinc-500 hover:text-zinc-300"
                          }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => {
                          setCompanies(prev => prev.map((it, i) => (i === idx ? { ...it, status: "approved" } : it)));
                        }}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${company.status === "approved"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "text-zinc-500 hover:text-zinc-300"
                          }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setCompanies(prev => prev.map((it, i) => (i === idx ? { ...it, status: "rejected" } : it)));
                        }}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${company.status === "rejected"
                          ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                          : "text-zinc-500 hover:text-zinc-300"
                          }`}
                      >
                        Reject
                      </button>
                    </div>
                  </div>

                  <Button
                    variant="bordered"
                    className="border-zinc-850 hover:border-zinc-750 bg-zinc-900/40 text-white font-medium rounded-2xl hover:bg-zinc-900/80 px-4 py-2 transition-all flex items-center gap-2"
                    onPress={() => handleOpenEdit(idx)}
                  >
                    <FaEdit /> Edit Company
                  </Button>
                </div>
              </div>

              {/* About Section */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">About Company</h4>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{company.description}</p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-6 border-t border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-zinc-850 flex items-center justify-center text-zinc-400">
                    <FaGlobe size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Website</span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white flex items-center gap-1 hover:underline text-sm font-medium mt-0.5"
                    >
                      {company?.website?.replace("https://", "").replace("http://", "")}
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-zinc-850 flex items-center justify-center text-zinc-400">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Location</span>
                    <span className="text-zinc-300 text-sm font-medium mt-0.5">{company.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-zinc-850 flex items-center justify-center text-zinc-400">
                    <FaUsers size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Employees</span>
                    <span className="text-zinc-300 text-sm font-medium mt-0.5">{company.employeeRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          ))
        )}
      </div>

      {/* --- REGISTER / EDIT FORM MODAL --- */}
      <Modal state={modalState}>
        <Modal.Backdrop className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fade-in">
          <Modal.Container className="w-full max-w-3xl flex items-center justify-center">
            <Modal.Dialog className="outline-none flex flex-col w-full bg-zinc-950 border border-zinc-850 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] !max-w-3xl !p-0">
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Modal Header */}
                <Modal.Header className="flex items-center justify-between px-6 py-5 border-b border-zinc-900">
                  <div className="flex flex-col">
                    <Modal.Heading className="text-xl font-bold text-white tracking-tight">
                      {isEdit ? "Edit Company Profile" : "Register New Company"}
                    </Modal.Heading>
                    <span className="text-xs text-zinc-500 mt-1">
                      Enter your business details to start hiring on HireLoop.
                    </span>
                  </div>
                  <Modal.CloseTrigger className="text-zinc-500 hover:text-white transition-colors bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 p-2 rounded-xl flex items-center justify-center">
                    <FaPlus className="rotate-45 w-4 h-4" />
                  </Modal.CloseTrigger>
                </Modal.Header>

                {/* Modal Scrollable Body */}
                <Modal.Body className="px-6 py-6  overflow-y-auto flex-1 space-y-6">
                  {/* Two Column Layout Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <TextField isRequired value={name} onChange={setName}>
                      <Label className="text-sm font-semibold text-zinc-400">Company Name</Label>
                      <Input
                        placeholder="e.g. Acme Corp"
                        className="mt-1.5 w-full rounded-xl border border-zinc-850 bg-zinc-900/30 hover:border-zinc-800 focus:border-zinc-700 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                      />
                    </TextField>

                    {/* Industry Select */}
                    <Select
                      isRequired
                      selectedKey={industry}
                      onSelectionChange={setIndustry}
                      placeholder="Select category"
                      className="w-full"
                    >
                      <Label className="text-sm font-semibold text-zinc-400">Industry / Category</Label>
                      <Select.Trigger className="mt-1.5 w-full rounded-xl border border-zinc-850 bg-zinc-900/30 hover:border-zinc-800 focus:border-zinc-700 px-4 py-2.5 text-sm text-white flex items-center justify-between outline-none transition-all cursor-pointer">
                        <Select.Value />
                        <Select.Indicator className="w-4 h-4 text-zinc-500" />
                      </Select.Trigger>
                      <Select.Popover className="border border-zinc-850 bg-zinc-950 rounded-xl shadow-2xl overflow-hidden mt-1 z-50 min-w-[var(--trigger-width)]">
                        <ListBox className="p-1 max-h-60 overflow-y-auto">
                          {INDUSTRIES.map((ind) => (
                            <ListBox.Item
                              key={ind}
                              id={ind}
                              textValue={ind}
                              className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg cursor-pointer outline-none transition-colors"
                            >
                              {ind}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    {/* Website Field */}
                    <TextField isRequired value={website} onChange={setWebsite}>
                      <Label className="text-sm font-semibold text-zinc-400">Website URL</Label>
                      <div className="mt-1.5 flex items-center rounded-xl border border-zinc-850 bg-zinc-900/30 hover:border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition-all overflow-hidden">
                        <span className="bg-zinc-900 border-r border-zinc-850 px-3.5 py-2.5 text-sm text-zinc-500 font-medium">
                          https://
                        </span>
                        <Input
                          placeholder="www.company.com"
                          className="flex-1 py-2.5 px-4 text-sm text-white placeholder:text-zinc-600 bg-transparent outline-none"
                        />
                      </div>
                    </TextField>

                    {/* Location Field */}
                    <TextField isRequired value={location} onChange={setLocation}>
                      <Label className="text-sm font-semibold text-zinc-400">Location</Label>
                      <div className="mt-1.5 flex items-center rounded-xl border border-zinc-850 bg-zinc-900/30 hover:border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition-all px-4">
                        <FaMapMarkerAlt className="text-zinc-500 mr-2.5" />
                        <Input
                          placeholder="City, Country"
                          className="flex-1 py-2.5 text-sm text-white placeholder:text-zinc-600 bg-transparent outline-none"
                        />
                      </div>
                    </TextField>

                    {/* Employee Range */}
                    <Select
                      isRequired
                      selectedKey={employeeRange}
                      onSelectionChange={setEmployeeRange}
                      placeholder="Select employee range"
                      className="w-full"
                    >
                      <Label className="text-sm font-semibold text-zinc-400">Employee Count Range</Label>
                      <Select.Trigger className="mt-1.5 w-full rounded-xl border border-zinc-850 bg-zinc-900/30 hover:border-zinc-800 focus:border-zinc-700 px-4 py-2.5 text-sm text-white flex items-center justify-between outline-none transition-all cursor-pointer">
                        <Select.Value />
                        <Select.Indicator className="w-4 h-4 text-zinc-500" />
                      </Select.Trigger>
                      <Select.Popover className="border border-zinc-850 bg-zinc-950 rounded-xl shadow-2xl overflow-hidden mt-1 z-50 min-w-[var(--trigger-width)]">
                        <ListBox className="p-1 max-h-60 overflow-y-auto">
                          {EMPLOYEE_RANGES.map((range) => (
                            <ListBox.Item
                              key={range}
                              id={range}
                              textValue={range}
                              className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg cursor-pointer outline-none transition-colors"
                            >
                              {range}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    {/* Logo Upload Dropzone */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-zinc-400">Company Logo</span>
                      <div className="mt-1.5 flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-2xl border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 flex items-center justify-center overflow-hidden transition-all group cursor-pointer shadow-inner">
                          {uploading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          ) : logoUrl ? (
                            <img src={logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                          ) : (
                            <FaUpload className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                          )}
                          <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-sm font-medium text-zinc-300">Upload image</span>
                          <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Field (Full width) */}
                  <TextField isRequired value={description} onChange={setDescription} className="col-span-1 md:col-span-2">
                    <Label className="text-sm font-semibold text-zinc-400">Brief Description</Label>
                    <TextArea
                      rows={4}
                      placeholder="Tell us about your company's mission and culture..."
                      className="mt-1.5 w-full rounded-xl border border-zinc-850 bg-zinc-900/30 hover:border-zinc-800 focus:border-zinc-700 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-all resize-y"
                    />
                  </TextField>
                </Modal.Body>

                {/* Modal Footer */}
                <Modal.Footer className="px-6 py-4 border-t border-zinc-900 flex justify-end gap-3 bg-zinc-950/40">
                  <Button
                    type="button"
                    variant="bordered"
                    className="border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 font-medium rounded-xl px-5 py-2 transition-all"
                    onPress={modalState.close}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl px-5 py-2 shadow-lg transition-all"
                  >
                    {isEdit ? "Save Changes" : "Register Company"}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}