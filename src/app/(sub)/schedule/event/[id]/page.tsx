"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ScheduleEventType } from "@/types/schedule";
import { ProjectStatus, ContractType, WorkType } from "@/types/project";
import type { CalendarEvent } from "@/types/schedule";
import type { Project } from "@/types/project";

/* 
  일정 상세 페이지
*/
export default function ScheduleEventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API 연동 후 실제 데이터로 교체
    const mockEvent: CalendarEvent = {
      id: eventId,
      date: "2025-02-15",
      type: ScheduleEventType.APPLICATION_START,
      projectId: "1",
      projectName: "HR 관리 시스템 개선",
      description: "신규 프로젝트 지원 시작일입니다.",
    };

    const mockProject: Project = {
      id: "1",
      title: "HR 관리 시스템 개선",
      company: "테크밋",
      overview: "차세대 HR 관리 시스템 개발 프로젝트입니다.",
      detailedWork: "Next.js 15 기반 HR 관리 시스템 프론트엔드 개발",
      requiredSkills: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      contractType: ContractType.FREELANCE,
      workType: WorkType.HYBRID,
      experienceLevel: "4~10년 차",
      positions: 2,
      contractStartDate: "2025-03-01",
      contractEndDate: "2025-06-30",
      applicationDeadline: "2025-02-28",
      status: ProjectStatus.IN_PROGRESS,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-15",
    };

    setEvent(mockEvent);
    setProject(mockProject);
    setLoading(false);
  }, [eventId]);

  const getEventTypeLabel = (type: ScheduleEventType) => {
    switch (type) {
      case ScheduleEventType.APPLICATION_START:
        return "지원 시작";
      case ScheduleEventType.APPLICATION_END:
        return "지원 마감";
      case ScheduleEventType.DEPLOYMENT:
        return "투입 예정";
      default:
        return "이벤트";
    }
  };

  const getEventTypeColor = (type: ScheduleEventType) => {
    switch (type) {
      case ScheduleEventType.APPLICATION_START:
        return "bg-green-100 text-green-800";
      case ScheduleEventType.APPLICATION_END:
        return "bg-red-100 text-red-800";
      case ScheduleEventType.DEPLOYMENT:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!event || !project) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">일정을 찾을 수 없습니다.</p>
        <Link
          href="/schedule"
          className="inline-block px-6 py-2 bg-dark text-light rounded-lg hover:opacity-90 transition-opacity"
        >
          일정으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* 이벤트 정보 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getEventTypeColor(
              event.type
            )}`}
          >
            {getEventTypeLabel(event.type)}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-dark mb-2">
          {event.projectName}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{formatDate(event.date)}</p>
        {event.description && (
          <p className="text-sm text-gray-700 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      {/* 프로젝트 정보 */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-dark mb-4">프로젝트 정보</h3>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-4">
          <h4 className="text-base font-semibold text-dark mb-3">
            {project.title}
          </h4>
          <p className="text-sm text-gray-700 mb-4">{project.overview}</p>

          <div className="space-y-3 pt-3 border-t border-gray-100">
            {/* 고객사 */}
            {project.company && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">고객사</span>
                <span className="font-medium text-dark">{project.company}</span>
              </div>
            )}

            {/* 프로젝트 기간 */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">프로젝트 기간</span>
              <span className="font-medium text-dark">
                {project.contractStartDate} ~{" "}
                {project.contractEndDate || "진행중"}
              </span>
            </div>

            {/* 지원 마감일 */}
            {project.applicationDeadline && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">지원 마감일</span>
                <span className="font-medium text-dark">
                  {project.applicationDeadline}
                </span>
              </div>
            )}

            {/* 모집 인원 */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">모집 인원</span>
              <span className="font-medium text-dark">
                {project.positions}명
              </span>
            </div>
          </div>

          {/* 기술 스택 */}
          {project.requiredSkills && project.requiredSkills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-600 mb-2">필수 기술</p>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 프로젝트 상세 보기 버튼 */}
        <Link
          href={`/projects/${project.id}`}
          className="block w-full py-3 bg-dark text-light text-center rounded-lg hover:bg-opacity-90 transition-opacity font-medium"
        >
          프로젝트 상세 보기
        </Link>
      </div>
    </main>
  );
}
