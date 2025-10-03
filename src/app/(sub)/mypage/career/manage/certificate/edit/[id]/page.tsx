"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Certificate } from "@/types/career";

export default function EditCertificatePage() {
  const params = useParams();
  const router = useRouter();
  const certId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<
    Omit<Certificate, "createdAt" | "updatedAt">
  >({
    id: "",
    name: "",
    acquisitionDate: "",
    issuer: "",
    note: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // TODO: API로부터 데이터 가져오기
    const mockData: Certificate = {
      id: certId,
      name: "정보처리기사",
      acquisitionDate: "2019-05-20",
      issuer: "한국산업인력공단",
      note: "",
    };

    setFormData(mockData);
    setLoading(false);
  }, [certId]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: 파일 업로드 및 API 호출
      console.log("Updating certificate:", formData);
      if (file) {
        console.log("Uploading file:", file.name);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      alert("자격증이 수정되었습니다.");
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
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit}>
        {/* 자격증명 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            자격증명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="예: 정보처리기사"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            required
          />
        </div>

        {/* 취득일 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            취득일 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.acquisitionDate}
            onChange={(e) => handleChange("acquisitionDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            required
          />
        </div>

        {/* 발행기관 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            발행기관 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.issuer}
            onChange={(e) => handleChange("issuer", e.target.value)}
            placeholder="예: 한국산업인력공단"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            required
          />
        </div>

        {/* 특이사항 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            특이사항
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="추가로 기록할 내용이 있다면 입력하세요"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark resize-none"
          />
        </div>

        {/* 첨부파일 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-dark mb-2">
            자격증 첨부 (선택)
          </label>
          {formData.attachmentUrl && (
            <div className="mb-2 p-3 bg-gray-50 rounded-lg">
              <a
                href={formData.attachmentUrl}
                className="text-sm text-blue-600 hover:underline"
              >
                📎 {formData.attachmentName || "첨부파일 보기"}
              </a>
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              선택된 파일: {file.name}
            </p>
          )}
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
