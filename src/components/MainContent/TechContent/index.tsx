import styled from 'styled-components';

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

export default function TechContent() {
  return (
    <TechContentContainer>
      <TechItem>
        <img src="/images/logos/astro.png" alt="Astro Logo" />
        <span>Astro</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_bootstrap.png" alt="Bootstrap Logo" />
        <span>Bootstrap</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_css.png" alt="CSS Logo" />
        <span>CSS</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_redux.png" alt="Redux Logo" />
        <span>Redux</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_express.png" alt="Express Logo" />
        <span>Express</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_js.png" alt="JavaScript Logo" />
        <span>JavaScript</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_html.png" alt="HTML Logo" />
        <span>HTML</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_git.png" alt="GIT Logo" />
        <span>GIT</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_mongodb.png" alt="MongoDB Logo" />
        <span>MongoDB</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_nodejs.png" alt="Node.js Logo" />
        <span>Node.js</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_react.png" alt="React Logo" />
        <span>React</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_sql.png" alt="SQL Logo" />
        <span>SQL</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_tailwindcss.png" alt="Tailwind CSS Logo" />
        <span>Tailwind CSS</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_python.png" alt="Python Logo" />
        <span>Python</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/logo_next.png" alt="Next.js Logo" />
        <span>Next.js</span>
      </TechItem>

      <TechItem>
        <img src="/images/logos/ts-logo.png" alt="Typescript Logo" />
        <span>Typescript</span>
      </TechItem>

      <TechItem>
        <img
          src="/images/logos/styled-components-logo.png"
          alt="Styled Components Logo"
        />
        <span>Styled Components</span>
      </TechItem>
    </TechContentContainer>
  );
}
