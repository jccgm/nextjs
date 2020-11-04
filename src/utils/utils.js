import request, { postOptionsFormData, postOptions } from "./request";
import moment from "moment";
import { get } from "lodash";
/**
 * Obtener filtro de reducer
 * @param {*} payload
 * @param {*} filterAffiliates
 */

export const getFilter = (payload, filterAffiliates) => {
  if (payload) {
    const { type, value } = payload;
    if (type === "societyId" && typeof filterAffiliates?.subSocietyId !== "undefined") {
      delete filterAffiliates["subSocietyId"];
    }
    const filterApply = value !== "" ? { [type]: value } : false;
    if (filterApply) {
      return {
        ...filterAffiliates,
        ...filterApply,
      };
    } else {
      delete filterAffiliates[type];
      return filterAffiliates;
    }
  } else {
    return filterAffiliates;
  }
};

/**
 *
 * @param {*} data
 */

export const buildFormData = (data) => {
  const formData = new FormData();
  formData.append("file", data);
  return formData;
};

/**
 * Subir una imagen al servidor
 * @param { containerName, fileFormdata, propsFilestorages } fileStorages
 */

export const uploadFileStorages = async ({ containerName, fileFormdata, propsFilestorages, forSociety = false }) => {
  try {
    let url, option;
    url = `${process.env.URL_API}/containers/${containerName}/upload`;
    const formData = buildFormData(fileFormdata);
    option = postOptionsFormData(formData);
    const requestUpload = await request(url, option);
    const { size, name, originName, mediaLink, contentType } = requestUpload;

    url = forSociety ? `societies/${propsFilestorages.societyId}/main-picture` : `file-storages`;
    option = postOptions({ size: parseInt(size), originName, format: contentType, name, link: mediaLink, state: "ONLINE", ...propsFilestorages });
    return await request(`${process.env.URL_API}/${url}`, option);
  } catch {
    throw "No se pudo registrar la imagen";
  }
};

/**
 *
 * @param {data, index} Index
 */

export const useIndex = ({ data, index }) =>
  data?.reduce(
    (valorAnterior, valorActual) => ({
      ...valorAnterior,
      [valorActual[index]]: valorActual,
    }),
    {}
  );

/**
 *
 * @param {*} object
 */

export const getFileStorages = (object) => {
  let fileStorages = {};
  if (object?.fileStorages && object.fileStorages.length > 0) {
    const { link, id, name } = object.fileStorages[0];
    fileStorages = { url: link, uid: id, name: name, status: `done` };
  }
  return fileStorages;
};

export const getFileStoragesObject = (object) => {
  let fileStorages = {};
  const { link, id, name } = object;
  fileStorages = { url: link, uid: id, name: name, status: `done` };
  return fileStorages;
};

/**
 *
 * @param {*} object
 */
export const cleanObject = (object) => {
  for (var propName in object) {
    if (object[propName] === null || object[propName] === undefined) {
      delete object[propName];
    }
  }
};

/**
 *
 * @param {*} countMinutes
 */
export const getTimeHoursAndMinutes = (countMinutes) => {
  // const hours = moment.utc().startOf("day").add({ minutes: countMinutes }).format("H").padStart(2, "0");
  const hours = moment.utc().startOf("day").add({ minutes: countMinutes }).format("H");
  const minutes = moment.utc().startOf("day").add({ minutes: countMinutes }).format("mm");
  return `${hours !== "0" ? hours + " Horas y" : ""} ${minutes} Minutos`;
};

export const getUploadProps = ({ fileList: fileListUpload, dispatch, nameFields, multiple = false, form, size = 1 }) => {
  return {
    name: `FILE_${nameFields.toUpperCase()}`,
    multiple,
    onRemove: () => {
      setTimeout(() => form.resetFields([nameFields]), 1000);
      return true;
    },
    beforeUpload: (info) => {
      setTimeout(() => {
        if (size === 1) {
          form.resetFields([nameFields]);
        }
        form.setFieldsValue({ [nameFields]: info });
      }, 1000);
      return false;
    },
    onChange: (info) => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-size);
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      dispatch(fileList);
    },
    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    },
    fileList: fileListUpload,
  };
};

/**
 *
 * @param {*} profession
 */

export const getSpecialtiesToProfessions = (profession) => {
  return get(profession, "divideds", []).map((divided) => {
    return {
      ...get(divided, "specialty", {}),
    };
  });
};
