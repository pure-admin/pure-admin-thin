import { http } from "@/utils/http";

// parameter_extraction

// 文件上传结果类型
export type FileUploadResult = { message: string } | { error: string };

// 读取文件信息结果类型
export type FileInfoResult =
  | { column_count: number; column_names: string[]; data_count: number }
  | { error: string };

// 随机森林训练结果类型
export type RandomForestResult = { message: string } | { error: string };

// 模型列表结果类型
export type ModelListResult =
  | { message: string; objects: string[] }
  | { error: string };

// 模型下载结果类型
export type DownloadModelResult =
  | { message: string; local_path: string }
  | { error: string };

// 特征重要性结果类型
export type FeatureImportanceResult =
  | { message: string; feature_importance_dict: Record<string, number> }
  | { error: string };

// 排列特征重要性结果类型
export type PermutationImportanceResult =
  | { message: string; permutation_importance_dict: Record<string, number> }
  | { error: string };

// 递归特征消除结果类型
export type RecursiveFeatureEliminationResult =
  | { message: string; selected_names: string[] }
  | { error: string };

/** 上传文件 */
export const uploadLocalFile = (data: FormData) => {
  return http.request<FileUploadResult>(
    "post",
    "http://127.0.0.1:5005/parameter_extraction/file_upload",
    {
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/** 获取文件信息 */
export const getFileInfo = (filename: string) => {
  return http.request<FileInfoResult>(
    "get",
    "http://127.0.0.1:5005/parameter_extraction/file_show",
    {
      params: { filename }
    }
  );
};

/** 训练随机森林模型 */
export const trainRandomForest = (data: {
  input_file: string;
  output_file: string;
  n_estimators?: number;
}) => {
  return http.request<RandomForestResult>(
    "post",
    "http://127.0.0.1:5005/parameter_extraction/random_forest",
    { data }
  );
};

/** 列出所有模型 */
export const listModels = () => {
  return http.request<ModelListResult>(
    "get",
    "http://127.0.0.1:5005/parameter_extraction/list_models"
  );
};

/** 下载模型 */
export const downloadModel = (data: { model_name: string }) => {
  return http.request<DownloadModelResult>(
    "post",
    "http://127.0.0.1:5005/parameter_extraction/download_model",
    { data }
  );
};

/** 获取特征重要性 */
export const getFeatureImportance = (data: {
  model_name: string;
  input_file: string;
  output_file: string;
  number_key_parameters?: number;
}) => {
  return http.request<FeatureImportanceResult>(
    "post",
    "http://127.0.0.1:5005/parameter_extraction/feature_importance",
    { data }
  );
};

/** 获取排列特征重要性 */
export const getPermutationImportance = (data: {
  model_name: string;
  input_file: string;
  output_file: string;
  number_key_parameters?: number;
}) => {
  return http.request<PermutationImportanceResult>(
    "post",
    "http://127.0.0.1:5005/parameter_extraction/permutation_importance",
    { data }
  );
};

/** 递归特征消除 */
export const getRecursiveFeatureElimination = (data: {
  model_name: string;
  input_file: string;
  output_file: string;
}) => {
  return http.request<RecursiveFeatureEliminationResult>(
    "post",
    "http://127.0.0.1:5005/parameter_extraction/recursive_feature_elimination",
    { data }
  );
};

// --------------------------------------------------------------------------------------------
//  correlation_analysis

// 列出 Excel 文件结果类型
export type ListExcelResult =
  | { message: string; object_list: string[] }
  | { error: string };

// 下载 Excel 文件结果类型
export type DownloadExcelResult =
  | { message: string; download_path: string }
  | { error: string };

// 灰度关联分析结果类型
export type GrayCorrelationAnalysisResult =
  | {
      message: string;
      relation_results: { Feature: string; RelationDegree: number }[];
    }
  | { error: string };

// 生成图像结果类型
export type GenerateImageResult = Blob;

// 列出 Excel 文件
export const listExcel = () => {
  return http.request<ListExcelResult>(
    "get",
    "http://127.0.0.1:5005/correlation_analysis/list_excel"
  );
};

/** 下载 Excel 文件 */
export const downloadExcel = (data: { excel_name: string }) => {
  return http.request<DownloadExcelResult>(
    "post",
    "http://127.0.0.1:5005/correlation_analysis/download_excel",
    { data }
  );
};

/** 灰度关联分析 */
export const grayCorrelationAnalysis = (data: { file: string }) => {
  return http.request<GrayCorrelationAnalysisResult>(
    "post",
    "http://127.0.0.1:5005/correlation_analysis/gray_correlation_analysis",
    { data }
  );
};

/** 生成图像 */
export const generateImage = (data: {
  relation_results: { Feature: string; RelationDegree: number }[];
}) => {
  return http.request<GenerateImageResult>(
    "post",
    "http://127.0.0.1:5005/correlation_analysis/generate_image",
    {
      data,
      responseType: "blob" // 设置响应类型为blob以处理二进制数据
    }
  );
};
