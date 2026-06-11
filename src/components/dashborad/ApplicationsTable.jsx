"use client";

import Link from "next/link";
import { Button, Chip, Table } from "@heroui/react";
import { FiBriefcase, FiExternalLink, FiFileText } from "react-icons/fi";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const getApplicationId = (application) => {
  if (typeof application?._id === "string") return application._id;
  if (application?._id?.$oid) return application._id.$oid;
  return `${application?.jobId}-${application?.applicantId}`;
};

export default function ApplicationsTable({ applications = [] }) {
  if (!applications.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-[#111111]">
            <FiBriefcase className="text-2xl text-zinc-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">No applications yet</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Your submitted job applications will appear here.
          </p>
          <Link href="/jobs">
            <Button color="primary" className="mt-6">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Applications</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Track the jobs you have applied for and review your submitted details.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Applications Table">
            <Table.Header>
              <Table.Column id="applicant" isRowHeader>APPLICANT</Table.Column>
              <Table.Column id="experience">EXPERIENCE</Table.Column>
              <Table.Column id="salary">EXPECTED SALARY</Table.Column>
              <Table.Column id="startDate">START DATE</Table.Column>
              <Table.Column id="appliedAt">APPLIED AT</Table.Column>
              <Table.Column id="status">STATUS</Table.Column>
              <Table.Column id="actions">ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body items={applications}>
              {(application) => (
                <Table.Row id={getApplicationId(application)}>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {application.applicantName || "Unnamed Applicant"}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {application.applicantEmail || "No email"}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {application.phone || "No phone"}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{application.experience || "N/A"}</Table.Cell>
                  <Table.Cell>
                    {application.expectedSalary
                      ? `$${application.expectedSalary.toLocaleString()}`
                      : "N/A"}
                  </Table.Cell>
                  <Table.Cell>{formatDate(application.startDate)}</Table.Cell>
                  <Table.Cell>{formatDate(application.appliedAt)}</Table.Cell>

                  <Table.Cell>
                    <Chip color="primary" size="sm" variant="flat">
                      Applied
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {application.resumeLink && (
                        <Link href={application.resumeLink}>
                          <Button isIconOnly size="sm" variant="light" title="Open resume">
                            <FiFileText className="text-lg" />
                          </Button>
                        </Link>
                      )}
                      {application.jobId && (
                        <Link href={`/jobs/${application.jobId}`}>
                          <Button isIconOnly size="sm" variant="light" title="View job">
                            <FiExternalLink className="text-lg" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
