import { gql } from "@apollo/client";

export const MutationCreatePlat = gql`
  mutation MutationCreatePlat(
    $plat: String!
    $nama: String!
    $id_plat: String!
    $status: String!
    $keterangan: String!
    $plat_nomor: String!
    $free: Int!
    $saldo: Int!
  ) {
    createPlat(
      plat: $plat
      nama: $nama
      id_plat: $id_plat
      status: $status
      keterangan: $keterangan
      plat_nomor: $plat_nomor
      free: $free
      saldo: $saldo
    ) {
      plat
    }
  }
`;

export const MutationDeletePlat = gql`
  mutation MutationDeletePlat($plat: String!) {
    deletePlat(plat: $plat) {
      nama
    }
  }
`;

export const MutationEditPlat = gql`
  mutation MutationEditPlat(
    $plat: String!
    $nama: String!
    $id_plat: String!
    $status: String!
    $keterangan: String!
    $plat_nomor: String!
    $free: Int!
    $saldo: Int!
  ) {
    updatePlat(
      plat: $plat
      nama: $nama
      id_plat: $id_plat
      status: $status
      keterangan: $keterangan
      plat_nomor: $plat_nomor
      free: $free
      saldo: $saldo
    ) {
      plat
    }
  }
`;
