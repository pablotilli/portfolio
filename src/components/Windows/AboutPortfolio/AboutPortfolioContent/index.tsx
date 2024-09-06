import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
              <h2>La Idea</h2>
              <p>
                A lo largo de mi carrera profesional he estado en constante
                búsqueda de nuevas formas de innovar y destacar no solo mis
                habilidades técnicas, sino también mi enfoque en la experiencia
                del usuario.
              </p>
              <p>
                Siempre he creído que un portafolio debe ser más que una simple
                recopilación de proyectos.
              </p>
              <p>
                Fue esta combinación de factores lo que me llevó a desarrollar
                un portfolio interactivo, ofreciendo una experiencia distinta
                tanto en desktop como en dispositivos móviles.
              </p>
              <p>
                Quería algo que no solo presentara mi trabajo, sino que
                involucrara a los visitantes de una manera más dinámica e
                inmersiva. La idea fue trasladar la familiaridad que todos
                tenemos con nuestras propias computadoras y celulares, haciendo
                que la navegación fuera intuitiva y, al mismo tiempo, divertida.
              </p>
            </div>
          </IdeaSectionContent>
        </Section>

        <Section
          id="section-1"
          ref={sectionsRefs[1]}
          title="Experiencia Desktop"
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
              /* background: 'white', */
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
                En la versión desktop de mi portafolio, los usuarios se
                encuentran con un entorno que replica una computadora de
                escritorio. Aquí, cada sección está representada como un
                programa diferente que puede abrirse y explorarse.
              </p>
              <p>
                Desde el primer momento, los visitantes ven un escritorio con
                íconos que representan cada sección clave: un dock que facilita
                la navegación y la sensación de estar realmente interactuando
                con una computadora. Uno de los programas es mi CV, donde he
                presentado parte de mi trayectoria profesional. Además, en la
                "app" de documentos, los usuarios pueden descargar una versión
                en PDF de mi currículum, lo que facilita que tengan una copia
                física o digital de mi experiencia y habilidades. Otra sección
                es la carpeta de imágenes, donde he recopilado imagenes de
                varias de las tecnologías que domino, brindando una vista rápida
                de mis capacidades técnicas. Además se puede encontrar en el
                escritorio una "app" para contactarme.
              </p>
              <p>
                He querido ofrecer también a los usuarios la posibilidad de
                personalizar su experiencia, reflejando así uno de los
                principios que más valoro en el desarrollo: la adaptabilidad.
                Por ello, inclui opciones de configuración que permiten cambiar
                el fondo de pantalla, modificar el esquema de colores para
                adaptarse a diferentes preferencias visuales y seleccionar el
                idioma de navegación. Incluso he añadido la posibilidad de
                agregar o quitar widgets, permitiendo una personalización que
                hace que cada visita al portafolio pueda ser diferente.
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
          title="Experiencia Móvil"
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
                Cuando pensé en cómo adaptar esta experiencia a dispositivos
                móviles, me di cuenta de que necesitaba un enfoque que
                mantuviera el concepto central de interacción, pero que también
                respetara las limitaciones y oportunidades de las pantallas más
                pequeñas. Así, en la versión mobile de mi portafolio, trasladé
                el concepto de la computadora a una emulación de la interfaz de
                un celular. Esto no solo preserva la idea de interactividad,
                sino que también garantiza que el portafolio sea accesible y
                usable en cualquier dispositivo, lo que es crucial en un mundo
                donde el tráfico móvil sigue creciendo.
              </p>
              <p>
                La versión mobile ofrece una navegación sencilla y mantiene las
                opciones de personalización, asegurando que los usuarios tengan
                una experiencia tan rica y ajustada a sus preferencias como en
                la versión desktop.
              </p>
            </MobileTextContainer>
          </MobileSectionContent>
        </Section>

        <Section
          id="section-3"
          ref={sectionsRefs[3]}
          title="Conclusión"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <ConclusionSectionContent isLarge={isLarge}>
            A través de este portafolio, no solo he querido mostrar lo que sé
            hacer, sino también cómo lo hago, destacando mi enfoque en la
            experiencia del usuario, la adaptabilidad, y la capacidad de
            transformar ideas en productos digitales que son tanto funcionales
            como visualmente atractivos. Este proyecto es una culminación de mi
            pasión por la tecnología y la innovación, y refleja mi compromiso
            con la creación de experiencias digitales que sean tanto prácticas
            como emocionantes.
          </ConclusionSectionContent>
        </Section>

        <Section
          id="section-4"
          ref={sectionsRefs[4]}
          title="Tecnologías"
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
