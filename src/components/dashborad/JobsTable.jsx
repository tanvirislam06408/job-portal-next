"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Chip, Table } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2, FiBriefcase } from "react-icons/fi";

const statusColorMap = {
  active: "success",
  inactive: "danger",
  pending: "warning",
};

export default function JobsTable({ jobs }) {

  
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      let first = "";
      let second = "";

      switch (sortDescriptor.column) {
        case "title":
          first = a.jobInfo.title;
          second = b.jobInfo.title;
          break;
        case "category":
          first = a.jobInfo.category;
          second = b.jobInfo.category;
          break;
        case "company":
          first = a.company.companyName;
          second = b.company.companyName;
          break;
        case "status":
          first = a.status;
          second = b.status;
          break;
        default:
          return 0;
      }

      let cmp = first.localeCompare(second);
      if (sortDescriptor.direction === "descending") cmp *= -1;
      return cmp;
    });
  }, [jobs, sortDescriptor]);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="container mx-auto mt-6">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-default-100 flex items-center justify-center mb-4">
            <FiBriefcase size={28} className="text-default-500" />
          </div>
          <h3 className="text-lg font-semibold text-default-900 mb-1">No jobs posted yet</h3>
          <p className="text-default-500 text-sm mb-6">Create your first job posting to start receiving applications.</p>
          <Link href="/dashboard/rectuiter/jobs/new">
            <Button color="primary" size="md">
              Create Job
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6">
      <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Jobs Table"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column id="title" allowsSorting isRowHeader>JOB TITLE</Table.Column>
            <Table.Column id="category" allowsSorting>CATEGORY</Table.Column>
            <Table.Column id="type">TYPE</Table.Column>
            <Table.Column id="company" allowsSorting>COMPANY</Table.Column>
            <Table.Column id="deadline">DEADLINE</Table.Column>
            <Table.Column id="status" allowsSorting>STATUS</Table.Column>
            <Table.Column id="visibility">VISIBILITY</Table.Column>
            <Table.Column id="actions">ACTIONS</Table.Column>
          </Table.Header>

          <Table.Body items={sortedJobs}>
            {(job) => (
              <Table.Row id={job._id}>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{job.jobInfo.title}</span>
                    <span className="text-xs text-default-500">ID: {job._id.slice(-6)}</span>
                  </div>
                </Table.Cell>

                <Table.Cell>{job.jobInfo.category}</Table.Cell>
                <Table.Cell>{job.jobInfo.type}</Table.Cell>
                <Table.Cell>{job.company.companyName}</Table.Cell>
                <Table.Cell>{job.jobInfo.deadline}</Table.Cell>

                <Table.Cell>
                  <Chip
                    color={statusColorMap[job.status] || "primary"}
                    size="sm"
                    variant="flat"
                  >
                    {job.status}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    color={job.isPubliclyVisible ? "success" : "warning"}
                    size="sm"
                    variant="flat"
                  >
                    {job.isPubliclyVisible ? "Public" : "Private"}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/rectuiter/jobs/${job._id}`}>
                      <Button isIconOnly size="sm" variant="light">
                        <FiEye className="text-lg" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/rectuiter/jobs/${job._id}`}>
                      <Button isIconOnly size="sm" variant="light">
                        <FiEdit2 className="text-lg" />
                      </Button>
                    </Link>
                    <Button isIconOnly size="sm" color="danger" variant="light">
                      <FiTrash2 className="text-lg" />
                    </Button>
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