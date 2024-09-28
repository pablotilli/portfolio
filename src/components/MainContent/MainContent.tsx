import { forwardRef, RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';

import WorkIcon from '@material-ui/icons/Work';

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import { Section } from '../Windows/CV/Section';
import TechContent from './TechContent';
import { useTranslation } from 'react-i18next';

import './styles.css';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  p {
    font-size: 1rem;
    margin-bottom: 10px;
    font-weight: normal;
  }
`;

const ContentContainer = styled.div`
  flex: 1;

  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

interface PresentationContainerProps {
  isLarge: boolean;
}

const PresentationContainer = styled.div<PresentationContainerProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};
`;

const JobTitle = styled.p`
  font-size: 1.8rem !important;
  color: white;
`;

const Title = styled.p`
  font-weight: bold !important;
  font-size: 1.2rem !important;

  background: #0056b3;
  padding: 4px 8px 6px 8px;
  border-radius: 3px;
`;

interface MainContentProps {
  sectionsRefs: RefObject<HTMLElement>[];
  contentRef: RefObject<HTMLDivElement>;
}

const MainContent = forwardRef<HTMLDivElement, MainContentProps>(
  ({ sectionsRefs, contentRef }, ref) => {
    const { t } = useTranslation();

    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        if (contentRef.current) {
          const mainDivWidth = contentRef.current.clientWidth;
          setIsLarge(mainDivWidth > 500);
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <AppContainer id="cv-content">
        <ContentContainer ref={contentRef}>
          <Section
            id="section-0"
            ref={sectionsRefs[0]}
            title={t('cv_content.sections.presentation.title')}
          >
            <PresentationContainer
              style={{ display: 'flex' }}
              isLarge={isLarge}
            >
              <img
                style={{
                  border: '1px solid black',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  marginRight: '20px',
                  width: '150px',
                  maxHeight: '150px',
                  objectFit: 'cover',
                }}
                src="/images/login_avatar.png"
              />
              <div>
                <p>{t('cv_content.sections.presentation.paragraphs.1')}</p>
                <p>{t('cv_content.sections.presentation.paragraphs.2')}</p>
              </div>
            </PresentationContainer>
          </Section>
          <Section
            id="section-1"
            ref={sectionsRefs[1]}
            title={t('cv_content.sections.work_experience.title')}
          >
            <h1 style={{ marginBottom: '25px' }}>
              {t('cv_content.sections.work_experience.subtitle')}
            </h1>
            <VerticalTimeline layout="1-column">
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: '#2f2f2f',
                  color: '#c4c4c4',
                }}
                contentArrowStyle={{
                  borderRight: '7px solid  #2f2f2f',
                }}
                date={t('cv_content.sections.work_experience.jobs.1.date')}
                iconStyle={{ background: '#2f2f2f', color: '#c4c4c4' }}
                icon={<WorkIcon />}
              >
                <JobTitle>
                  {t('cv_content.sections.work_experience.jobs.1.company')}
                </JobTitle>

                <h3 className="vertical-timeline-element-subtitle">
                  {t('cv_content.sections.work_experience.jobs.1.role')}
                </h3>
                <p>
                  {t('cv_content.sections.work_experience.jobs.1.description')}
                </p>

                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.responsibilities_title'
                  )}
                </Title>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.responsibilities.1'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.technologies.1'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.technologies.2'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.technologies.3'
                  )}
                </p>
                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements_title'
                  )}
                </Title>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements.1'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements.2'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements.3'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements.4'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements.5'
                  )}
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: '#2f2f2f',
                  color: '#c4c4c4',
                }}
                contentArrowStyle={{
                  borderRight: '7px solid  #2f2f2f',
                }}
                date={t('cv_content.sections.work_experience.jobs.2.date')}
                iconStyle={{ background: '#2f2f2f', color: '#c4c4c4' }}
                icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  <JobTitle>
                    {t('cv_content.sections.work_experience.jobs.2.company')}
                  </JobTitle>
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {t('cv_content.sections.work_experience.jobs.2.role')}
                </h4>
                <p>
                  {t('cv_content.sections.work_experience.jobs.2.description')}
                </p>
                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.responsibilities_title'
                  )}
                </Title>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.responsibilities.1'
                  )}
                </p>

                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.technologies.1'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.technologies.2'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.technologies.3'
                  )}
                </p>
                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.achievements_title'
                  )}
                </Title>

                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.2.achievements.1'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.2.achievements.2'
                  )}
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={t('cv_content.sections.work_experience.jobs.3.date')}
                iconStyle={{ background: '#2f2f2f', color: '#c4c4c4' }}
                contentArrowStyle={{
                  borderRight: '7px solid  #2f2f2f',
                }}
                icon={<WorkIcon />}
                contentStyle={{
                  background: '#2f2f2f',
                  color: '#c4c4c4',
                }}
              >
                <h3 className="vertical-timeline-element-title">
                  <JobTitle>
                    {t('cv_content.sections.work_experience.jobs.3.company')}
                  </JobTitle>
                </h3>
                <h3 className="vertical-timeline-element-subtitle">
                  {t('cv_content.sections.work_experience.jobs.3.role')}
                </h3>
                <p>
                  {t('cv_content.sections.work_experience.jobs.3.description')}
                </p>

                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.technologies.1'
                  )}
                </p>
                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.responsibilities_title'
                  )}
                </Title>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.responsibilities.1'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.responsibilities.2'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.responsibilities.3'
                  )}
                </p>
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.responsibilities.4'
                  )}
                </p>
                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.achievements_title'
                  )}
                </Title>

                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.3.achievements.1'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.3.achievements.2'
                  )}
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: '#2f2f2f',
                  color: '#c4c4c4',
                }}
                date={t('cv_content.sections.work_experience.jobs.4.date')}
                iconStyle={{ background: '#2f2f2f', color: '#c4c4c4' }}
                contentArrowStyle={{
                  borderRight: '7px solid  #2f2f2f',
                }}
                icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  <JobTitle>
                    {t('cv_content.sections.work_experience.jobs.4.company')}
                  </JobTitle>
                </h3>
                <p>
                  {t('cv_content.sections.work_experience.jobs.4.description')}
                </p>
                <Title>
                  {t(
                    'cv_content.sections.work_experience.jobs.4.achievements_title'
                  )}
                </Title>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.4.achievements.1'
                  )}
                </p>
                <p>
                  •{' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.4.achievements.2'
                  )}
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </Section>
          <Section
            id="section-2"
            ref={sectionsRefs[2]}
            title={t('cv_content.sections.technical_skills_title')}
          >
            <TechContent />
          </Section>
          <Section
            id="section-3"
            ref={sectionsRefs[3]}
            title={t('cv_content.sections.languages.title')}
          >
            <p>{t('cv_content.sections.languages.spanish_level')}</p>
            <p>{t('cv_content.sections.languages.english_level')}</p>
          </Section>
          <Section
            id="section-4"
            ref={sectionsRefs[4]}
            title={t('cv_content.sections.higher_education_title')}
          >
            <p>• {t('cv_content.sections.higher_education.1.degree')}</p>
            <p>{t('cv_content.sections.higher_education.1.institution')}</p>

            <p>• {t('cv_content.sections.higher_education.2.degree')}</p>
            <p>{t('cv_content.sections.higher_education.2.institution')}</p>
          </Section>
        </ContentContainer>
      </AppContainer>
    );
  }
);

export default MainContent;
