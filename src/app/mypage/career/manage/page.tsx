'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import type { CareerProfile, CompanyCareer, ProjectCareer, Certificate, Education } from '@/types/career'
import { EducationLevel, GraduationStatus } from '@/types/career'
import { formatDate } from '@/lib/utils/career'

export default function CareerManagePage() {
  const router = useRouter()

  // TODO: API로부터 데이터 가져오기
  const [profile, setProfile] = useState<CareerProfile>({
    personalInfo: {
      name: '김테크',
      gender: 'male',
      birthDate: '1990-01-15',
      phone: '010-1234-5678',
      email: 'tech@techmeet.com',
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'AWS', 'Docker'],
    },
    companyCareer: [
      {
        id: '1',
        companyName: '테크밋',
        startDate: '2020-03-01',
        position: '시니어 개발자',
        duties: 'HR 관리 시스템 개발 및 유지보수',
      },
    ],
    projectCareer: [
      {
        id: '1',
        projectName: 'HR 관리 시스템 고도화',
        clientName: '테크밋',
        startDate: '2024-01-01',
        orderer: '내부 프로젝트',
        environment: ['React', 'Next.js', 'TypeScript'],
        responsibilities: 'Frontend 개발 총괄',
      },
    ],
    certificates: [
      {
        id: '1',
        name: '정보처리기사',
        acquisitionDate: '2019-05-20',
        issuer: '한국산업인력공단',
      },
    ],
    education: [
      {
        id: '1',
        level: EducationLevel.BACHELOR,
        status: GraduationStatus.GRADUATED,
        schoolName: '한국대학교',
        startDate: '2012-03-01',
        endDate: '2016-02-20',
        major: '컴퓨터공학',
      },
    ],
  })

  const handleAddCompany = () => {
    alert('회사 경력 추가 기능은 추후 구현됩니다.')
  }

  const handleEditCompany = (id: string) => {
    alert(`회사 경력 수정: ${id}`)
  }

  const handleDeleteCompany = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProfile((prev) => ({
        ...prev,
        companyCareer: prev.companyCareer.filter((item) => item.id !== id),
      }))
    }
  }

  const handleAddProject = () => {
    alert('프로젝트 경력 추가 기능은 추후 구현됩니다.')
  }

  const handleEditProject = (id: string) => {
    alert(`프로젝트 경력 수정: ${id}`)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProfile((prev) => ({
        ...prev,
        projectCareer: prev.projectCareer.filter((item) => item.id !== id),
      }))
    }
  }

  const handleAddCertificate = () => {
    alert('자격증 추가 기능은 추후 구현됩니다.')
  }

  const handleEditCertificate = (id: string) => {
    alert(`자격증 수정: ${id}`)
  }

  const handleDeleteCertificate = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProfile((prev) => ({
        ...prev,
        certificates: prev.certificates.filter((item) => item.id !== id),
      }))
    }
  }

  const handleAddEducation = () => {
    alert('학력 추가 기능은 추후 구현됩니다.')
  }

  const handleEditEducation = (id: string) => {
    alert(`학력 수정: ${id}`)
  }

  const handleDeleteEducation = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProfile((prev) => ({
        ...prev,
        education: prev.education.filter((item) => item.id !== id),
      }))
    }
  }

  const formatGender = (gender: string) => {
    const map: Record<string, string> = {
      male: '남성',
      female: '여성',
      other: '기타',
    }
    return map[gender] || gender
  }

  const formatEducationLevel = (level: EducationLevel) => {
    const map: Record<EducationLevel, string> = {
      [EducationLevel.HIGH_SCHOOL]: '고등학교',
      [EducationLevel.ASSOCIATE]: '전문학사',
      [EducationLevel.BACHELOR]: '학사',
      [EducationLevel.MASTER]: '석사',
      [EducationLevel.DOCTORATE]: '박사',
    }
    return map[level]
  }

  const formatGraduationStatus = (status: GraduationStatus) => {
    const map: Record<GraduationStatus, string> = {
      [GraduationStatus.GRADUATED]: '졸업',
      [GraduationStatus.EXPECTED]: '졸업예정',
      [GraduationStatus.ENROLLED]: '재학중',
      [GraduationStatus.LEAVE]: '휴학',
      [GraduationStatus.DROPPED]: '중퇴',
    }
    return map[status]
  }

  return (
    <MainLayout showBackButton backHref="/mypage" headerTitle="이력 관리" showBottomNav={false}>
      <div className="p-6 space-y-6">
          {/* 개인정보 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark">개인정보</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">이름</span>
                <span className="font-medium text-dark">{profile.personalInfo.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">성별</span>
                <span className="font-medium text-dark">{formatGender(profile.personalInfo.gender)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">생년월일</span>
                <span className="font-medium text-dark">{formatDate(profile.personalInfo.birthDate)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">휴대폰</span>
                <span className="font-medium text-dark">{profile.personalInfo.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">이메일</span>
                <span className="font-medium text-dark">{profile.personalInfo.email}</span>
              </div>
              <div className="py-2">
                <span className="text-gray-600 block mb-2">보유 스킬</span>
                <div className="flex flex-wrap gap-2">
                  {profile.personalInfo.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 회사 경력 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark">회사 경력</h2>
              <button
                onClick={handleAddCompany}
                className="px-3 py-1 bg-dark text-light text-xs font-medium rounded-lg hover:bg-opacity-90"
              >
                + 추가
              </button>
            </div>
            <div className="space-y-3">
              {profile.companyCareer.map((career) => (
                <div key={career.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dark">{career.companyName}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCompany(career.id)}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(career.id)}
                        className="text-red-600 text-xs hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      {formatDate(career.startDate)} ~ {career.endDate ? formatDate(career.endDate) : '현재'}
                    </p>
                    <p>직위: {career.position}</p>
                    <p>업무: {career.duties}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 프로젝트 경력 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark">프로젝트 경력</h2>
              <button
                onClick={handleAddProject}
                className="px-3 py-1 bg-dark text-light text-xs font-medium rounded-lg hover:bg-opacity-90"
              >
                + 추가
              </button>
            </div>
            <div className="space-y-3">
              {profile.projectCareer.map((project) => (
                <div key={project.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dark">{project.projectName}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project.id)}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 text-xs hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>고객사: {project.clientName}</p>
                    <p>
                      {formatDate(project.startDate)} ~ {project.endDate ? formatDate(project.endDate) : '진행중'}
                    </p>
                    <p>발주처: {project.orderer}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.environment.map((env, index) => (
                        <span key={index} className="px-2 py-0.5 bg-white border border-gray-300 text-gray-700 rounded">
                          {env}
                        </span>
                      ))}
                    </div>
                    <p>담당업무: {project.responsibilities}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 자격증 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark">자격증</h2>
              <button
                onClick={handleAddCertificate}
                className="px-3 py-1 bg-dark text-light text-xs font-medium rounded-lg hover:bg-opacity-90"
              >
                + 추가
              </button>
            </div>
            <div className="space-y-3">
              {profile.certificates.map((cert) => (
                <div key={cert.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dark">{cert.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCertificate(cert.id)}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="text-red-600 text-xs hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>취득일: {formatDate(cert.acquisitionDate)}</p>
                    <p>발행기관: {cert.issuer}</p>
                    {cert.note && <p>특이사항: {cert.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 학력 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark">학력</h2>
              <button
                onClick={handleAddEducation}
                className="px-3 py-1 bg-dark text-light text-xs font-medium rounded-lg hover:bg-opacity-90"
              >
                + 추가
              </button>
            </div>
            <div className="space-y-3">
              {profile.education.map((edu) => (
                <div key={edu.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dark">{edu.schoolName}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEducation(edu.id)}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="text-red-600 text-xs hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      {formatEducationLevel(edu.level)} · {formatGraduationStatus(edu.status)}
                    </p>
                    <p>
                      {formatDate(edu.startDate)} ~ {edu.endDate ? formatDate(edu.endDate) : '재학중'}
                    </p>
                    <p>전공: {edu.major}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
      </div>
    </MainLayout>
  )
}