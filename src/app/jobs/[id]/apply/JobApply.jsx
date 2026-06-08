"use client";

import { useState } from "react";
import {
    Button,
    Card,
    Input,
    Label,
    ListBox,
    NumberField,
    Select,
    Separator,
    TextArea,
    TextField,
    toast,
} from "@heroui/react";
import { applyJob } from "@/lib/actions/applications";

const JobApply = ({ jobsData, applicant,getJobApplications }) => {
    
    const [resumeLink, setResumeLink] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [phone, setPhone] = useState("");
    const [experience, setExperience] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [startDate, setStartDate] = useState("");
    const plan = {
        applications: 3,
        plan_type: 'free'
    }

    const pricingPlans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            desc: "Perfect for getting started",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic profile",
                "Email alerts",
            ],
            cta: "Current Plan",
            featured: false,
        },
        {
            name: "Pro",
            price: "$19",
            period: "month",
            desc: "For serious job seekers",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved jobs",
                "Application tracking",
                "Salary insights",
            ],
            cta: "Upgrade to Pro",
            featured: true,
        },
        {
            name: "Premium",
            price: "$39",
            period: "month",
            desc: "For career accelerators",
            features: [
                "Everything in Pro",
                "Unlimited applications",
                "Profile boost to recruiters",
                "Early access to new jobs",
                "Priority support",
            ],
            cta: "Upgrade to Premium",
            featured: false,
        },
    ]






    const handleSubmit = async (e) => {
        e.preventDefault();

        const applicationData = {
            jobId: jobsData._id,
            companyId: jobsData.company.companyId,
            applicantId: applicant.id,
            applicantName: applicant.name,
            applicantEmail: applicant.email,

            resumeLink,
            coverLetter,
            phone,
            experience,
            expectedSalary: expectedSalary ? Number(expectedSalary) : null,
            portfolioLink: portfolioLink || null,
            startDate,
            appliedAt: new Date(),
        };





        const res = await applyJob(applicationData);
        console.log(res);


        if (res.insertedId) {
            toast.success("Application submitted successfully");
            e.target.reset();
        } else {
            toast.error(res.message || "Failed to submit application");
        }
    };

    const exceeded = getJobApplications.length >= plan.applications;

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            {exceeded ? (
                <div>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
                        <p className="text-default-500 mt-2 max-w-lg mx-auto">
                            You&apos;ve used all {plan.applications} free applications this month. Choose a plan to keep applying.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {pricingPlans.map((p) => (
                            <Card
                                key={p.name}
                                className={`border ${p.featured ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10" : "border-default-200 bg-default-50"} p-6 relative`}
                            >
                                {p.featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                )}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold">{p.name}</h3>
                                    <div className="mt-3">
                                        <span className="text-4xl font-extrabold">{p.price}</span>
                                        <span className="text-default-500 text-sm ml-1">/{p.period}</span>
                                    </div>
                                    <p className="text-default-500 text-sm mt-2">{p.desc}</p>
                                </div>
                                <Separator className="my-5" />
                                <ul className="space-y-3">
                                    {p.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-default-600">
                                            <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    color={p.featured ? "primary" : "default"}
                                    variant={p.featured ? "solid" : "bordered"}
                                    className="w-full mt-6 font-medium"
                                >
                                    {p.cta}
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="my-2 font-semibold text-center">You applied {getJobApplications.length} of {plan.applications}</h1>
                    <Card className="shadow-sm border border-default-100">
                        <Card.Header className="flex flex-col items-start gap-1 px-6 pt-6">
                            <h1 className="text-2xl font-bold tracking-tight">Apply for {jobsData.jobInfo.title}</h1>
                            <p className="text-default-500 text-sm">
                                {jobsData.company?.companyName}
                            </p>
                        </Card.Header>

                        <Separator className="my-4" />

                        <Card.Content className="px-6 pb-6">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Applicant Info */}
                                <div className="bg-default-50 p-4 rounded-xl border border-default-200">
                                    <p className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-2">
                                        Applicant
                                    </p>
                                    <p className="font-semibold text-lg text-default-800">{applicant.name}</p>
                                    <p className="text-sm text-default-500">{applicant.email}</p>
                                </div>

                                {/* Resume */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 text-default-800">
                                        Resume & Cover Letter
                                    </h2>
                                    <div className="space-y-4">
                                        <TextField isRequired value={resumeLink} onChange={setResumeLink}>
                                            <Label className="text-sm font-medium text-default-700">Resume Link</Label>
                                            <Input
                                                type="url"
                                                placeholder="e.g. Google Drive, Dropbox link to your resume"
                                                className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                                            />
                                        </TextField>

                                        <TextField value={coverLetter} onChange={setCoverLetter}>
                                            <Label className="text-sm font-medium text-default-700">
                                                Cover Letter{" "}
                                                <span className="text-default-400 font-normal">(Optional)</span>
                                            </Label>
                                            <TextArea
                                                rows={5}
                                                placeholder="Tell us why you're a great fit for this role..."
                                                className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary resize-y"
                                            />
                                        </TextField>
                                    </div>
                                </div>

                                <Separator className="my-2" />

                                {/* Additional Information */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 text-default-800">
                                        Additional Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <TextField isRequired value={phone} onChange={setPhone}>
                                            <Label className="text-sm font-medium text-default-700">Phone Number</Label>
                                            <Input
                                                type="tel"
                                                placeholder="e.g. +880 1700-000000"
                                                className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                                            />
                                        </TextField>

                                        <Select
                                            isRequired
                                            selectedKey={experience}
                                            onSelectionChange={setExperience}
                                            placeholder="Select years of experience"
                                            className="w-full"
                                        >
                                            <Label className="text-sm font-medium text-default-700">Years of Experience</Label>
                                            <Select.Trigger className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm flex items-center justify-between">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover>
                                                <ListBox>
                                                    <ListBox.Item id="Fresher" textValue="Fresher">Fresher (&lt; 1 year)</ListBox.Item>
                                                    <ListBox.Item id="1-2" textValue="1-2">1 - 2 years</ListBox.Item>
                                                    <ListBox.Item id="3-5" textValue="3-5">3 - 5 years</ListBox.Item>
                                                    <ListBox.Item id="5-10" textValue="5-10">5 - 10 years</ListBox.Item>
                                                    <ListBox.Item id="10+" textValue="10+">10+ years</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>

                                        <NumberField
                                            value={expectedSalary === "" ? undefined : Number(expectedSalary)}
                                            onChange={(v) => setExpectedSalary(String(v))}
                                        >
                                            <Label className="text-sm font-medium text-default-700">
                                                Expected Salary{" "}
                                                <span className="text-default-400 font-normal">(Optional)</span>
                                            </Label>
                                            <div className="mt-1 flex items-center rounded-lg border border-default-300 px-3 focus-within:border-primary">
                                                <span className="text-default-400 text-sm mr-1">$</span>
                                                <Input
                                                    placeholder="0"
                                                    className="flex-1 py-2 text-sm outline-none bg-transparent"
                                                />
                                            </div>
                                        </NumberField>

                                        <TextField value={portfolioLink} onChange={setPortfolioLink}>
                                            <Label className="text-sm font-medium text-default-700">
                                                Portfolio / GitHub{" "}
                                                <span className="text-default-400 font-normal">(Optional)</span>
                                            </Label>
                                            <Input
                                                type="url"
                                                placeholder="e.g. https://github.com/your-profile"
                                                className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                                            />
                                        </TextField>

                                        <TextField isRequired value={startDate} onChange={setStartDate}>
                                            <Label className="text-sm font-medium text-default-700">Available From</Label>
                                            <Input
                                                type="date"
                                                className="mt-1 w-full rounded-lg border border-default-300 px-3 py-2 text-sm outline-none focus:border-primary"
                                            />
                                        </TextField>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button type="submit" color="primary" size="lg" className="font-medium px-8">
                                        Submit Application
                                    </Button>
                                </div>
                            </form>
                        </Card.Content>
                    </Card>
                </>
            )}
        </div>
    );
};

export default JobApply;