import { gql } from "@apollo/client";

export const SubscriptionGetPlat = gql`
  subscription getPlat {
    Plat_Kendaraan {
      Plat
      Nama
      ID_Plat
      Keterangan
      Plat_Nomor
      Free
      Saldo
      Status
    }
  }
`;
