import { gql } from "@apollo/client";

export const MutationCreatePlat = gql`
  mutation MyMutation($objects: [Plat_Kendaraan_insert_input!] = {}) {
    insert_Plat_Kendaraan(objects: $objects) {
      returning {
        Plat
        Nama
        ID_Plat
        Plat_Nomor
        Status
      }
    }
  }
`;

export const MutationDeletePlat = gql`
  mutation DeletePlat($Plat: String = "") {
    delete_Plat_Kendaraan_by_pk(Plat: $Plat) {
      Nama
      ID_Plat
    }
  }
`;

export const MutationEditPlat = gql`
  mutation EditPlat($_eq: String!, $_set: Plat_Kendaraan_set_input = {}) {
    update_Plat_Kendaraan(where: { Plat: { _eq: $_eq } }, _set: $_set) {
      returning {
        Plat
        Nama
      }
    }
  }
`;
