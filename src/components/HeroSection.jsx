"use client";

import {
    Input,
    Button,
    Chip,
    InputGroup,
} from "@heroui/react";

import {
    Magnifier,
    MapPin,
    Briefcase,
} from "@gravity-ui/icons";

export default function HeroSection() {
    const trendingJobs = [
        "Product Designer",
        "AI Engineering",
        "Dev-ops Engineer",
    ];

    return (
        <section className="relative overflow-hidden bg-black py-40 px-4">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#312e81_0%,transparent_35%)] opacity-50" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

            {/* Stars */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/3 left-1/4 h-1 w-1 rounded-full bg-violet-400" />
                <div className="absolute top-2/3 right-1/3 h-1 w-1 rounded-full bg-violet-400" />
                <div className="absolute bottom-20 left-1/2 h-1 w-1 rounded-full bg-violet-400" />
                <div className="absolute bottom-40 right-1/4 h-1 w-1 rounded-full bg-violet-400" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl text-center">
                {/* Badge */}
                <div className="mb-8 flex justify-center">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
                        <Briefcase className="h-4 w-4 text-orange-400" />
                        <span className="text-sm font-semibold text-white">
                            50,000+
                        </span>
                        <span className="text-sm text-gray-400 uppercase tracking-wider">
                            New Jobs This Month
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
                    Find Your Dream Job Today
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-6 max-w-2xl text-base text-gray-400 md:text-lg">
                    HireLoop connects top talent with world-class companies.
                    Browse thousands of curated opportunities and land your
                    next role — faster.
                </p>

                {/* Search Box */}
                <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
                    <div className="flex flex-col gap-2 md:flex-row">
                        <InputGroup className="flex-1">
                            <InputGroup.Prefix>
                                <Magnifier className="h-4 w-4 text-gray-400" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                variant="bordered"
                                placeholder="Job title, skill or company"
                                className="bg-transparent text-white border-0"
                            />
                        </InputGroup>

                        <div className="hidden w-px bg-white/10 md:block" />

                        <InputGroup className="flex-1">
                            <InputGroup.Prefix>
                                <MapPin className="h-4 w-4 text-gray-400" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                variant="bordered"
                                placeholder="Location or Remote"
                                className="bg-transparent text-white border-0"
                            />
                        </InputGroup>

                        <div className="w-full flex  justify-between">
                            <div className=""></div>
                            <Button
                                isIconOnly
                                className="h-12 min-w-12 bg-violet-600 text-white hover:bg-violet-500"
                            >
                                <Magnifier className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Trending */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm text-gray-500">
                        Trending Position
                    </span>

                    {trendingJobs.map((job) => (
                        <Chip
                            key={job}
                            variant="flat"
                            className="bg-white/5 text-gray-300 border border-white/10"
                        >
                            {job}
                        </Chip>
                    ))}
                </div>
            </div>
        </section>
    );
}