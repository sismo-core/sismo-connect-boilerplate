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
          <li>
              <Link href="/on-chain/simple-auth">
                Simple auth for Data Vault ownership
              </Link>
          </li>
          <li>
              <Link href="/on-chain/auth-and-claim">
                Claim on a groupId with devMode true and Data Vault ownership
              </Link>
          </li>
          <li>
              <Link href="/on-chain/two-auths-and-claim">
                Claim on a groupId with devMode true / optional Twitter account ownership / required GitHub account ownership and signature
              </Link>
          </li>
        </ul>
        <Subtitle>
          Off-chain
        </Subtitle>
        <ul style={{marginBottom: 30}}>
          <li style={{marginBottom: 10}}>
              <Link href="/off-chain/simple-claim">
                Simple claim on a groupId with devMode true
              </Link>
          </li>
          <li style={{marginBottom: 10}}>
              <Link href="/off-chain/simple-auth">
                Simple auth for Data Vault ownership
              </Link>
          </li>
          <li style={{marginBottom: 10}}>
              <Link href="/off-chain/auth-and-claim">
                Claim on a groupId with devMode true and Data Vault ownership
              </Link>
          </li>
          <li style={{marginBottom: 10}}>
              <Link href="/off-chain/two-auths-claim-and-signature">
                Claim on a groupId with devMode true / optional Twitter account ownership / required GitHub account ownership and signature
              </Link>
          </li>
          <li style={{marginBottom: 10}}>
              <Link href="/off-chain/complex">
                COMPLEX
              </Link>
          </li>
        </ul>
      </Content>
    </Container>
  )
}
