import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import Link from "next/link";
import styled from "styled-components";

const Content = styled.div`
  width: 500px;
`

const Subtitle = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`

export default function Home() {
  return (
    <Container>
      <Content>
        <Title>
          Sismo Connect boilerplate
        </Title>
        <Subtitle>
          On-chain
        </Subtitle>
        <ul>
          <li>
              <Link href="/on-chain/simple-claim">
                Simple claim on a groupId with devMode true
              </Link>
          </li>
        </ul>
        <Subtitle>
          Off-chain
        </Subtitle>
        <ul style={{marginBottom: 30}}>
          <li>
              <Link href="/off-chain/simple-claim">
                Simple claim on a groupId with devMode true
              </Link>
          </li>
          <li>
              <Link href="/off-chain/simple-auth">
                Simple auth for Data Vault ownership
              </Link>
          </li>
        </ul>
      </Content>
    </Container>
  )
}
