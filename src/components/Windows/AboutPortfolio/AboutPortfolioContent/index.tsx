import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import { Section } from './Section';
import Titlebar from '../../../Titlebar/TitleBar';

const AppContainer = styled.div`
  display: flex;
  height: calc(100% - 95px);
  width: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const DesktopTextContainer = styled.div`
  width: 94%;
  padding: 30px 0;

  p {
    margin: 20px 0;
    font-size: 1.2rem;
  }
`;

const MobileTextContainer = styled.div`
  padding: 30px 0;

  p {
    margin: 0 20px;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
`;

interface IdeaSectionContentProps {
  isLarge: boolean;
}

const IdeaSectionContent = styled.div<IdeaSectionContentProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};
  align-items: flex-start;

  div {
    backdrop-filter: blur(10px);
  }

  p {
    margin: 0 20px;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
`;

interface MobileSectionContentProps {
  isLarge: boolean;
}

const MobileSectionContent = styled.div<MobileSectionContentProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};

  justify-content: center;
  width: 90%;
  background: #ffffff40;
  backdrop-filter: blur(10px);
  color: #000000;
  padding: 30px;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 69%) 0px 0px 12px 0px;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 0;
    padding-top: 20px;

    video {
      width: 90%;
      align-self: center;
    }
  }
`;

interface ConclusionSectionContentProps {
  isLarge: boolean;
}

const ConclusionSectionContent = styled.div<ConclusionSectionContentProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};

  justify-content: center;
  width: 90%;
  background: #ffffff40;
  backdrop-filter: blur(10px);
  color: #000000;
  padding: 30px;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 69%) 0px 0px 12px 0px;
`;

interface TechnologiesSectionContentProps {
  isLarge: boolean;
}

const TechnologiesSectionContent = styled.div<TechnologiesSectionContentProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};

  justify-content: center;
  width: 90%;
  background: #ffffff40;
  backdrop-filter: blur(10px);
  color: #000000;
  padding: 30px;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 69%) 0px 0px 12px 0px;
`;

interface MainContentProps {
  sectionsRefs: RefObject<HTMLDivElement>[];
  contentRef: RefObject<HTMLDivElement>;
}

const TechContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 50px;

  margin: 30px 0;
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: contain;
    flex: 1;
  }

  span {
    text-align: center;
  }
`;

const CubeImage = styled.img`
  object-fit: contain;
  width: 20vw;
  margin-right: 30px;
  filter: drop-shadow(2px 4px 6px black);

  @media (max-width: 900px) {
    width: 60vw;
    align-self: center;
    padding-bottom: 20px;
  }
`;

const AboutPortfolioContent: React.FC<MainContentProps> = ({
  sectionsRefs,
  contentRef,
}) => {
  const [isLarge, setIsLarge] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        const mainDivWidth = contentRef.current.clientWidth;
        setIsLarge(mainDivWidth > 900);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AppContainer>
      <ContentContainer ref={contentRef}>
        <Section id="section-0" ref={sectionsRefs[0]} title="">
          <IdeaSectionContent isLarge={isLarge}>
            <CubeImage
              src="/images/about_section/rubik-cube.png"
              alt="Pablo Tilli Portfolio - Rubik cube"
            />
            <div
              style={{
                backgroundColor: '#ff272736',
                padding: '20px',
                width: '100%',
                borderRadius: '4px',
              }}
            >
              <h2>{t('about_portfolio_content.sections.the_idea.title')}</h2>
              <p>
                {t('about_portfolio_content.sections.the_idea.paragraphs.1')}
              </p>
              <p>
                {t('about_portfolio_content.sections.the_idea.paragraphs.2')}
              </p>
              <p>
                {t('about_portfolio_content.sections.the_idea.paragraphs.3')}
              </p>
              <p>
                {t('about_portfolio_content.sections.the_idea.paragraphs.4')}
              </p>
            </div>
          </IdeaSectionContent>
        </Section>

        <Section
          id="section-1"
          ref={sectionsRefs[1]}
          title={t('about_portfolio_content.sections.desktop_experience.title')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'url(/images/wallpapers/abstract/2.jpg) no-repeat',
            backgroundSize: 'cover',

            color: 'black',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              backdropFilter: 'blur(10px)',
              color: 'rgba(255, 255, 255, 0.87)',
              border: '1px solid black',
              borderRadius: '15px',
              boxShadow: 'rgb(0 0 0 / 69%) 0px 0px 12px 0px',
            }}
          >
            <Titlebar
              onMinimize={() => {}}
              onRestore={() => {}}
              onClose={() => {}}
              active
            />
            <video
              style={{
                aspectRatio: '2 / 0.8',
                width: '94%',
                marginTop: '30px',
                border: '1px solid black',
              }}
              src="/videos/demo_1.webm"
              autoPlay
              loop
              muted
            ></video>
            <DesktopTextContainer>
              <p>
                {t(
                  'about_portfolio_content.sections.desktop_experience.paragraphs.1'
                )}
              </p>
              <p>
                {t(
                  'about_portfolio_content.sections.desktop_experience.paragraphs.2'
                )}
              </p>
              <p>
                {t(
                  'about_portfolio_content.sections.desktop_experience.paragraphs.3'
                )}
              </p>
            </DesktopTextContainer>
          </div>
        </Section>

        {/*         <Section
          id="section-parallax"
          ref={parallaxRefs[1]}
          title=""
          style={{
            backgroundImage:
              'url(/images/about_section/mobile_version_header.png)',
          }}
        ></Section> */}

        <Section
          id="section-2"
          ref={sectionsRefs[2]}
          title={t('about_portfolio_content.sections.mobile_experience.title')}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <MobileSectionContent isLarge={isLarge}>
            {/*             <img
              src="/images/about_section/mobile_version.png"
              alt="Pablo Tilli Portfolio - Mobile version"
            /> */}
            <video
              style={{
                height: '100%',
              }}
              src="/videos/demo_mobile_1.webm"
              autoPlay
              loop
              muted
            ></video>
            <MobileTextContainer>
              <p>
                {t(
                  'about_portfolio_content.sections.mobile_experience.paragraphs.1'
                )}
              </p>
              <p>
                {t(
                  'about_portfolio_content.sections.mobile_experience.paragraphs.2'
                )}
              </p>
            </MobileTextContainer>
          </MobileSectionContent>
        </Section>

        <Section
          id="section-3"
          ref={sectionsRefs[3]}
          title={t('about_portfolio_content.sections.conclusion.title')}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <ConclusionSectionContent isLarge={isLarge}>
            {t('about_portfolio_content.sections.conclusion.paragraphs.1')}
          </ConclusionSectionContent>
        </Section>

        <Section
          id="section-4"
          ref={sectionsRefs[4]}
          title={t('about_portfolio_content.sections.technologies.title')}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <TechnologiesSectionContent isLarge={isLarge}>
            <TechContentContainer>
              <TechItem>
                <img src="/images/logos/logo_html.png" alt="HTML Logo" />
                <span>HTML</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_css.png" alt="CSS Logo" />
                <span>CSS</span>
              </TechItem>

              <TechItem>
                <img
                  src="/images/logos/logo_tailwindcss.png"
                  alt="Tailwind CSS Logo"
                />
                <span>Tailwind CSS</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_js.png" alt="JavaScript Logo" />
                <span>JavaScript</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/ts-logo.png" alt="Typescript Logo" />
                <span>Typescript</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_react.png" alt="React Logo" />
                <span>React</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_redux.png" alt="Redux Logo" />
                <span>Redux</span>
              </TechItem>

              <TechItem>
                <img
                  src="/images/logos/styled-components-logo.png"
                  alt="Styled Components Logo"
                />
                <span>Styled Components</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_nodejs.png" alt="Node.js Logo" />
                <span>Node.js</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_express.png" alt="Express Logo" />
                <span>Express</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_sql.png" alt="SQL Logo" />
                <span>SQL</span>
              </TechItem>

              <TechItem>
                <img src="/images/logos/logo_git.png" alt="GIT Logo" />
                <span>GIT</span>
              </TechItem>
            </TechContentContainer>
          </TechnologiesSectionContent>
        </Section>
      </ContentContainer>
    </AppContainer>
  );
};

export default AboutPortfolioContent;
