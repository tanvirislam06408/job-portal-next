"use client";

import React, { useState } from "react";
import {
  Input,
  Select,
  Label,
  ListBox,
  TextArea,
  Switch,
  Button,
  Card,
  Separator,
  TextField,
  NumberField,
  Description,
} from "@heroui/react";

const MOCK_RECRUITER_COMPANY = {
  id: "comp_987654321",
  name: "TechVibe Solutions",
  isApproved: true,
};

export default function CreateJobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState(null);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isRemote, setIsRemote] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [deadline, setDeadline] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!MOCK_RECRUITER_COMPANY.isApproved) {
      console.error("Submission blocked: company not approved.");
      return;
    }

    const formData = {
      jobInfo: {
        title: jobTitle,
        category: jobCategory,
        type: jobType,
        salary: {
          min: Number(minSalary),
          max: Number(maxSalary),
          currency,
        },
        location: isRemote
          ? { isRemote: true, city: "Remote", country: "Remote" }
          : { isRemote: false, city, country },
        deadline,
      },
      jobDescription: {
        responsibilities,
        requirements,
        benefits: benefits || null,
      },
      company: {
        companyId: MOCK_RECRUITER_COMPANY.id,
        companyName: MOCK_RECRUITER_COMPANY.name,
      },
      status: "active",
      isPubliclyVisible: true,
    };

    console.log("Job Post Payload Submitted successfully:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/*
        FIX 1: Card — v3 uses compound dot-notation.
        <Card> is the root, <Card.Header> replaces the old <CardHeader> named export.
        <Card.Content> wraps the main content for proper internal padding.
      */}
      <Card className="shadow-sm border border-default-100">
        <Card.Header className="flex flex-col items-start gap-1 px-6 pt-6">
          <h1 className="text-2xl font-bold tracking-tight">Create a New Job Post</h1>
          <p className="text-default-500 text-sm">
            Fill in the details below to publish your open position.
          </p>
        </Card.Header>

        <Separator className="my-4" />

        <Card.Content className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* --- COMPANY SECTION (AUTO-FILLED & READ ONLY) --- */}
            <div className="bg-default-50 p-4 rounded-xl border border-default-200">
              <p className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-2">
                Posting As Company
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-lg text-default-800">
                    {MOCK_RECRUITER_COMPANY.name}
                  </span>
                  <span className="ml-3 text-xs bg-success-50 text-success-600 border border-success-200 px-2.5 py-0.5 rounded-full font-medium">
                    Approved Recruiter
                  </span>
                </div>
              </div>
            </div>

            {/* --- JOB INFO SECTION --- */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-default-800">Job Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

                {/*
                  FIX 2: Input / TextField — v3 separates concerns.
                  Bare <Input> is an unstyled primitive. For a labeled, bordered field,
                  wrap it in <TextField> and add a <Label> child.
                  - Replace onValueChange → onChange (React standard event handler)
                  - Remove variant="bordered" from Input; add border styling via className
                  - startContent does NOT exist in v3; use InputGroup or prefix markup instead
                */}
                <TextField isRequired value={jobTitle} onChange={setJobTitle}>
                  <Label className="text-sm font-medium text-default-700">Job Title</Label>
                  <Input
                    placeholder="e.g. Senior MERN Stack Developer"
                    className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </TextField>

                <TextField isRequired value={jobCategory} onChange={setJobCategory}>
                  <Label className="text-sm font-medium text-default-700">Job Category</Label>
                  <Input
                    placeholder="e.g. Engineering, Design"
                    className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </TextField>

                {/*
                  FIX 3: Select — v3 compound API.
                  - <Label> goes INSIDE <Select>, not outside it
                  - selectedKey / onSelectionChange replace value / onChange
                  - <Select.Trigger>, <Select.Value>, <Select.Indicator>, <Select.Popover>
                    are required sub-parts; there is no auto-render
                  - placeholder prop is on <Select> directly
                  - isRequired replaces required
                */}
                <Select
                  isRequired
                  selectedKey={jobType}
                  onSelectionChange={setJobType}
                  placeholder="Select job commitment"
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-default-700">Job Type</Label>
                  <Select.Trigger className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm flex items-center justify-between">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Full-time" textValue="Full-time">Full-time</ListBox.Item>
                      <ListBox.Item id="Part-time" textValue="Part-time">Part-time</ListBox.Item>
                      <ListBox.Item id="Remote" textValue="Remote">Remote</ListBox.Item>
                      <ListBox.Item id="Contract" textValue="Contract">Contract</ListBox.Item>
                      <ListBox.Item id="Internship" textValue="Internship">Internship</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                <TextField isRequired value={deadline} onChange={setDeadline}>
                  <Label className="text-sm font-medium text-default-700">Application Deadline</Label>
                  <Input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </TextField>
              </div>

              {/* Salary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end">
                {/*
                  FIX 4: Salary inputs — startContent doesn't exist in v3.
                  Use a wrapping div with an inline prefix character instead.
                  <NumberField> is the v3 primitive for numeric inputs.
                */}
                <NumberField isRequired value={minSalary === "" ? undefined : Number(minSalary)} onChange={(v) => setMinSalary(String(v))}>
                  <Label className="text-sm font-medium text-default-700">Minimum Salary</Label>
                  <div className="mt-1 flex items-center rounded-lg border border-default-300 px-3 focus-within:border-primary">
                    <span className="text-default-400 text-sm mr-1">$</span>
                    <Input
                      placeholder="0"
                      className="flex-1 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </NumberField>

                <NumberField isRequired value={maxSalary === "" ? undefined : Number(maxSalary)} onChange={(v) => setMaxSalary(String(v))}>
                  <Label className="text-sm font-medium text-default-700">Maximum Salary</Label>
                  <div className="mt-1 flex items-center rounded-lg border border-default-300 px-3 focus-within:border-primary">
                    <span className="text-default-400 text-sm mr-1">$</span>
                    <Input
                      placeholder="0"
                      className="flex-1 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </NumberField>

                <Select
                  isRequired
                  selectedKey={currency}
                  onSelectionChange={(key) => setCurrency(String(key))}
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-default-700">Currency</Label>
                  <Select.Trigger className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm flex items-center justify-between">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="USD" textValue="USD">USD ($)</ListBox.Item>
                      <ListBox.Item id="BDT" textValue="BDT">BDT (৳)</ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR">EUR (€)</ListBox.Item>
                      <ListBox.Item id="GBP" textValue="GBP">GBP (£)</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Location */}
              <div className="mt-6 p-4 border border-default-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-default-800">Remote Working</p>
                    <p className="text-xs text-default-500">
                      Toggle on if this position is fully remote.
                    </p>
                  </div>

                  {/*
                    FIX 5: Switch — v3 compound pattern is mandatory.
                    Bare <Switch /> with no children is invalid in v3.
                    Required structure: <Switch><Switch.Control><Switch.Thumb/></Switch.Control></Switch>
                    - isSelected and onChange are the valid props in v3
                    - color prop is removed; use className on Switch.Control for custom color
                  */}
                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                  >
                    <Switch.Control className="data-[selected=true]:bg-primary">
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch>
                </div>

                {!isRemote && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <TextField isRequired={!isRemote} value={city} onChange={setCity}>
                      <Label className="text-sm font-medium text-default-700">City</Label>
                      <Input
                        placeholder="e.g. Dhaka"
                        className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </TextField>

                    <TextField isRequired={!isRemote} value={country} onChange={setCountry}>
                      <Label className="text-sm font-medium text-default-700">Country</Label>
                      <Input
                        placeholder="e.g. Bangladesh"
                        className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </TextField>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-2" />

            {/* --- JOB DESCRIPTION SECTION --- */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-default-800">Job Description</h2>
              <div className="space-y-4">

                {/*
                  FIX 6: TextArea — v3's TextArea is a bare primitive.
                  For labeled fields use <TextField> + <Label> + <TextArea>.
                  - onValueChange is removed; use onChange with e.target.value
                  - minRows is not a v3 prop; use rows instead
                  - variant="bordered" is not a v3 prop; use className
                */}
                <TextField isRequired value={responsibilities} onChange={setResponsibilities}>
                  <Label className="text-sm font-medium text-default-700">Responsibilities</Label>
                  <TextArea
                    rows={4}
                    placeholder="Detail the day-to-day duties..."
                    className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary resize-y"
                  />
                </TextField>

                <TextField isRequired value={requirements} onChange={setRequirements}>
                  <Label className="text-sm font-medium text-default-700">Requirements</Label>
                  <TextArea
                    rows={4}
                    placeholder="What skills or experience are mandatory?"
                    className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary resize-y"
                  />
                </TextField>

                <TextField value={benefits} onChange={setBenefits}>
                  <Label className="text-sm font-medium text-default-700">
                    Benefits{" "}
                    <span className="text-default-400 font-normal">(Optional)</span>
                  </Label>
                  <TextArea
                    rows={3}
                    placeholder="What perks or bonuses do you offer?"
                    className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary resize-y"
                  />
                </TextField>
              </div>
            </div>

            {/* --- ACTION BUTTON --- */}
            <div className="pt-4 flex justify-end">
              <Button type="submit" color="primary" size="lg" className="font-medium px-8">
                Publish Active Listing
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}