import { gql } from "@apollo/client";

export const QueryGetPlat = gql`
  query GetPlat($plat: String!) {
    Plat_Kendaraan(where: { Plat: { _eq: $plat } }) {
      Plat
      ID_Plat
      Nama
      Plat_Nomor
      Saldo
      Free
      Status
      Keterangan
    }
  }
`;

export const QueryGetByName = gql`
  query GetByName($_iregex: String!) {
    Plat_Kendaraan(where: { Nama: { _iregex: $_iregex } }) {
      Free
      ID_Plat
      Keterangan
      Nama
      Plat_Nomor
      Plat
      Saldo
      Status
    }
  }
`;
