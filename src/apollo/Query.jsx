import { gql } from "@apollo/client";

export const QueryGetPlat = gql`
  query GetPlat($plat: String!) {
    plat(plat: $plat) {
      plat
      nama
      id_plat
      status
      keterangan
      free
      saldo
      created_at
      updated_at
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

export const GetPlats = gql`
  query {
    Plats(orderBy: [{ column: CREATED_AT, order: DESC }]) {
      plat
      nama
      id_plat
      status
      keterangan
      free
      saldo
      created_at
      updated_at
    }
  }
`;
