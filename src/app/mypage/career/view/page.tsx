'use client'

import { useState } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import type { CareerProfile } from '@/types/career'
import { EducationLevel, GraduationStatus } from '@/types/career'
import { formatDate } from '@/lib/utils/career'

export default function CareerViewPage() {
  // TODO: API로부터 데이터 가져오기
  const [profile] = useState<CareerProfile>({
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
        duties: 'HR 관리 시스템 개발 및 유지보수, 팀 리딩',
      },
      {
        id: '2',
        companyName: '스타트업코리아',
        startDate: '2018-01-01',
        endDate: '2020-02-28',
        position: '주니어 개발자',
        duties: '웹 애플리케이션 개발',
      },
    ],
    projectCareer: [
      {
        id: '1',
        projectName: 'HR 관리 시스템 고도화',
        clientName: '테크밋',
        startDate: '2024-01-01',
        orderer: '내부 프로젝트',
        environment: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
        responsibilities: 'Frontend 개발 총괄, API 설계',
      },
    ],
    certificates: [
      {
        id: '1',
        name: '정보처리기사',
        acquisitionDate: '2019-05-20',
        issuer: '한국산업인력공단',
        note: '',
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
    <MainLayout showBackButton backHref="/mypage" headerTitle="이력 정보 조회">
      <main className="p-6">
        {/* 수정하기 버튼 */}
        <div className="mb-6">
          <Link
            href="/mypage/career/manage"
            className="inline-block px-4 py-2 bg-dark text-light text-sm font-medium rounded-lg hover:bg-opacity-90 transition-colors"
          >
            수정하기
          </Link>
        </div>

        <div className="space-y-6">
          {/* 개인정보 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-dark mb-4">개인정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">이름</span>
                <span className="text-sm font-medium text-dark">{profile.personalInfo.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">성별</span>
                <span className="text-sm font-medium text-dark">{formatGender(profile.personalInfo.gender)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">생년월일</span>
                <span className="text-sm font-medium text-dark">{formatDate(profile.personalInfo.birthDate)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">휴대폰</span>
                <span className="text-sm font-medium text-dark">{profile.personalInfo.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">이메일</span>
                <span className="text-sm font-medium text-dark">{profile.personalInfo.email}</span>
              </div>
              <div className="py-2">
                <span className="text-sm text-gray-600 block mb-2">보유 스킬</span>
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
            <h2 className="text-lg font-semibold text-dark mb-4">회사 경력</h2>
            <div className="space-y-4">
              {profile.companyCareer.map((career) => (
                <div key={career.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-dark mb-2">{career.companyName}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">투입기간:</span> {formatDate(career.startDate)} ~{' '}
                      {career.endDate ? formatDate(career.endDate) : '현재'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">직위:</span> {career.position}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">업무내용:</span> {career.duties}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 프로젝트 경력 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-dark mb-4">프로젝트 경력</h2>
            <div className="space-y-4">
              {profile.projectCareer.map((project) => (
                <div key={project.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-dark mb-2">{project.projectName}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">고객사:</span> {project.clientName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">투입기간:</span> {formatDate(project.startDate)} ~{' '}
                      {project.endDate ? formatDate(project.endDate) : '진행중'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">발주처:</span> {project.orderer}
                    </p>
                    <div className="text-gray-600">
                      <span className="font-medium">개발환경:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.environment.map((env, index) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                            {env}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      <span className="font-medium">담당업무:</span> {project.responsibilities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 자격증 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-dark mb-4">자격증</h2>
            <div className="space-y-4">
              {profile.certificates.map((cert) => (
                <div key={cert.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-dark mb-2">{cert.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">취득일:</span> {formatDate(cert.acquisitionDate)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">발행기관:</span> {cert.issuer}
                    </p>
                    {cert.note && (
                      <p className="text-gray-600">
                        <span className="font-medium">특이사항:</span> {cert.note}
                      </p>
                    )}
                    {cert.attachmentUrl && (
                      <a href={cert.attachmentUrl} className="text-blue-600 text-xs hover:underline">
                        📎 {cert.attachmentName || '첨부파일 보기'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 학력 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-dark mb-4">학력</h2>
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-dark mb-2">{edu.schoolName}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">학력:</span> {formatEducationLevel(edu.level)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">졸업구분:</span> {formatGraduationStatus(edu.status)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">재학기간:</span> {formatDate(edu.startDate)} ~{' '}
                      {edu.endDate ? formatDate(edu.endDate) : '재학중'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">전공:</span> {edu.major}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  )
}