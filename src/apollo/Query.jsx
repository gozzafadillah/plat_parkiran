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
