import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';

import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import { Section } from '../Windows/CV/Section';
import TechContent from './TechContent';
import { useTranslation } from 'react-i18next';

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

const JobTitle = styled.p`
  font-size: 1.8rem !important;
  color: white;
`;

interface MainContentProps {
  sectionsRefs: RefObject<HTMLElement>[];
  contentRef: RefObject<HTMLDivElement>;
}

const MainContent = forwardRef<HTMLDivElement, MainContentProps>(
  ({ sectionsRefs, contentRef }, ref) => {
    const { t } = useTranslation();

    return (
      <AppContainer id="cv-content">
        <ContentContainer ref={contentRef}>
          <Section
            id="section-0"
            ref={sectionsRefs[0]}
            title={t('cv_content.sections.presentation.title')}
          >
            <div style={{ display: 'flex' }}>
              <img
                style={{
                  border: '1px solid black',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  marginRight: '20px',
                  width: '150px',
                  objectFit: 'cover',
                }}
                src="/images/login_avatar.png"
              />
              <div>
                <p>{t('cv_content.sections.presentation.paragraphs.1')}</p>
                <p>{t('cv_content.sections.presentation.paragraphs.2')}</p>
              </div>
            </div>
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

                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.responsibilities_title'
                  )}
                </p>
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
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.1.achievements_title'
                  )}
                </p>
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
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.responsibilities_title'
                  )}
                </p>
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
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.2.achievements_title'
                  )}
                </p>

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
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.responsibilities_title'
                  )}
                </p>
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
                <p>
                  {t(
                    'cv_content.sections.work_experience.jobs.3.achievements_title'
                  )}
                </p>

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
                <p>
                  {' '}
                  {t(
                    'cv_content.sections.work_experience.jobs.4.achievements_title'
                  )}
                </p>
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
            title="HABILIDADES TECNICAS"
          >
            {/*             Tecnologías HTML 5, CSS 3, Grid, Flexbox, Bootstrap, Tailwind CSS,
            Styled Components, JavaScript, React, Next.js, React Native,
            Node.js, Express, SQL, TypeScript, Java, Python, Visual Basic, VBA.
            Análisis y diseño de sistemas Maquetado desde Figma GIT */}
            <TechContent />
          </Section>
          <Section id="section-3" ref={sectionsRefs[3]} title="IDIOMAS">
            <p>Español: Nativo</p>
            <p>Inglés: Comprensión lectora avanzada / Oral B1</p>
          </Section>
          <Section
            id="section-4"
            ref={sectionsRefs[4]}
            title="EDUCACIÓN SUPERIOR"
          >
            <p>• Analista de Sistemas</p>
            <p>Universidad Nacional de Lujan</p>

            <p>• Programador Superior</p>
            <p>I.S.F.D. y T. Nº 189</p>
          </Section>
        </ContentContainer>
      </AppContainer>
    );
  }
);

export default MainContent;
