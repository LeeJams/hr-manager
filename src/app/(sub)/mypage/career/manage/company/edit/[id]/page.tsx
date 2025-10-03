"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { CompanyCareer } from "@/types/career";

export default function EditCompanyCareerPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<
    Omit<CompanyCareer, "createdAt" | "updatedAt">
  >({
    id: "",
    companyName: "",
    startDate: "",
    endDate: "",
    position: "",
    duties: "",
  });
  const [isCurrentJob, setIsCurrentJob] = useState(false);

  useEffect(() => {
    // TODO: API로부터 데이터 가져오기
    const mockData: CompanyCareer = {
      id: careerId,
      companyName: "테크밋",
      startDate: "2020-03-01",
      endDate: undefined,
      position: "시니어 개발자",
      duties: "HR 관리 시스템 개발 및 유지보수, 팀 리딩",
    };

    setFormData(mockData);
    setIsCurrentJob(!mockData.endDate);
    setLoading(false);
  }, [careerId]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: API 호출
      const submitData = {
        ...formData,
        endDate: isCurrentJob ? undefined : formData.endDate,
      };
      console.log("Updating company career:", submitData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      alert("회사 경력이 수정되었습니다.");
      router.push("/mypage/career/manage");
    } catch (error) {
      console.error("Update error:", error);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit}>
        {/* 회사명 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            회사명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            placeholder="회사명을 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            required
          />
        </div>

        {/* 시작일 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            입사일 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            required
          />
        </div>

        {/* 현재 재직 중 체크박스 */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCurrentJob}
              onChange={(e) => setIsCurrentJob(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-dark">현재 재직 중</span>
          </label>
        </div>

        {/* 종료일 */}
        {!isCurrentJob && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              퇴사일
            </label>
            <input
              type="date"
              value={formData.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>
        )}

        {/* 직위 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            직위 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
            placeholder="예: 시니어 개발자, 팀장 등"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            required
          />
        </div>

        {/* 업무내용 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-dark mb-2">
            업무내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.duties}
            onChange={(e) => handleChange("duties", e.target.value)}
            placeholder="담당했던 주요 업무를 입력하세요"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark resize-none"
            required
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-3 bg-dark text-light rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </main>
  );
}
