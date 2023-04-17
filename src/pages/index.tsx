import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Title>Sismo Connect boilerplate</Title>
      <section>
        <h2>On-chain examples</h2>
        <ul>
          <li onClick={() => router.push("/on-chain/simple-claim")}>
            <h3>Simple Claim</h3>
            <p>on a groupId with devMode true</p> 
          </li>
          <li onClick={() => router.push("/on-chain/simple-auth")}>
            <h3>Simple Auth</h3>
            <p>for Data Vault ownership</p> 
          </li>
          <li onClick={() => router.push("/on-chain/auth-and-claim")}>
            <h3>Simple Claim and Data Vault ownership</h3>
            <p>- Claim on a groupId with devMode true </p>
            <p>- Data Vault ownership</p>
          </li>
          <li onClick={() => router.push("/on-chain/two-auths-and-claim")}>
            <h3>One Claim, two Auths and Signature</h3>
            <p>- Claim on a groupId with devMode true</p>
            <p>- Required GitHub account ownership</p>
            <p>- Optional Twitter account ownership</p>
            <p>- Message signature</p>
          </li>
        </ul>
      </section>
      <section>
        <h2>Off-chain examples</h2>
        <ul>
          <li onClick={() => router.push("/off-chain/simple-claim")}>
            <h3>Simple Claim</h3>
            <p>on a groupId with devMode true</p>
          </li>
          <li onClick={() => router.push("/off-chain/simple-auth")}>
            <h3>Simple Auth</h3>
            <p>for Data Vault ownership</p>
          </li>
          <li onClick={() => router.push("/off-chain/auth-and-claim")}>
            <h3>Simple Claim and Data Vault ownership</h3>
            <p>- Claim on a groupId with devMode true </p>
            <p>- Data Vault ownership</p>
          </li>
          <li onClick={() => router.push("/off-chain/two-auths-claim-and-signature")}>
            <h3>One Claim, two Auths and Signature</h3>
            <p>- Claim on a groupId with devMode true</p>
            <p>- Required GitHub account ownership</p>
            <p>- Optional Twitter account ownership</p>
            <p>- Message signature</p>
          </li>
        </ul>
      </section>
    </Container>
  );
}
