/**
 * @description 提取菜单树中的每一项uniqueId
 * @param tree 树
 * @returns 每一项uniqueId组成的数组
 */
export const extractPathList = (tree: any[]): any => {
  if (!Array.isArray(tree)) {
    console.warn("tree must be an array");
    return [];
  }
  if (!tree || tree.length === 0) return [];
  const expandedPaths: Array<number | string> = [];
  for (const node of tree) {
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      extractPathList(node.children);
    }
    expandedPaths.push(node.uniqueId);
  }
  return expandedPaths;
};

/**
 * @description 如果父级下children的length为1，删除children并自动组建唯一uniqueId
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 组件唯一uniqueId后的树
 */
export const deleteChildren = (tree: any[], pathList = []): any => {
  if (!Array.isArray(tree)) {
    console.warn("menuTree must be an array");
    return [];
  }
  if (!tree || tree.length === 0) return [];
  for (const [key, node] of tree.entries()) {
    if (node.children && node.children.length === 1) delete node.children;
    node.id = key;
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null;
    node.pathList = [...pathList, node.id];
    node.uniqueId =
      node.pathList.length > 1 ? node.pathList.join("-") : node.pathList[0];
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      deleteChildren(node.children, node.pathList);
    }
  }
  return tree;
};

/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 创建层级关系后的树
 */
export const buildHierarchyTree = (tree: any[], pathList = []): any => {
  if (!Array.isArray(tree)) {
    console.warn("tree must be an array");
    return [];
  }
  if (!tree || tree.length === 0) return [];
  for (const [key, node] of tree.entries()) {
    node.id = key;
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null;
    node.pathList = [...pathList, node.id];
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      buildHierarchyTree(node.children, node.pathList);
    }
  }
  return tree;
};

/**
 * @description 广度优先遍历，根据唯一uniqueId找当前节点信息
 * @param tree 树
 * @param uniqueId 唯一uniqueId
 * @returns 当前节点信息
 */
export const getNodeByUniqueId = (
  tree: any[],
  uniqueId: number | string
): any => {
  if (!Array.isArray(tree)) {
    console.warn("menuTree must be an array");
    return [];
  }
  if (!tree || tree.length === 0) return [];
  const item = tree.find(node => node.uniqueId === uniqueId);
  if (item) return item;
  const childrenList = tree
    .filter(node => node.children)
    .map(i => i.children)
    .flat(1) as unknown;
  return getNodeByUniqueId(childrenList as any[], uniqueId);
};

/**
 * @description 向当前唯一uniqueId节点中追加字段
 * @param tree 树
 * @param uniqueId 唯一uniqueId
 * @param fields 需要追加的字段
 * @returns 追加字段后的树
 */
export const appendFieldByUniqueId = (
  tree: any[],
  uniqueId: number | string,
  fields: object
): any => {
  if (!Array.isArray(tree)) {
    console.warn("menuTree must be an array");
    return [];
  }
  if (!tree || tree.length === 0) return [];
  for (const node of tree) {
    const hasChildren = node.children && node.children.length > 0;
    if (
      node.uniqueId === uniqueId &&
      Object.prototype.toString.call(fields) === "[object Object]"
    )
      Object.assign(node, fields);
    if (hasChildren) {
      appendFieldByUniqueId(node.children, uniqueId, fields);
    }
  }
  return tree;
};

/**
 * 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示
 *（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
 * 这个是pure作者留下的例子， 也可以通过设置disabled 对应的字段来实现 比如disabled: 'status' (需要后端的字段为true/false)
 * @param treeList
 * @param field 根据哪个字段来设置disabled
 * @returns
 */
export function setDisabledForTreeOptions(treeList, field) {
  if (!treeList || !treeList.length) return;
  const newTreeList = [];
  for (let i = 0; i < treeList.length; i++) {
    treeList[i].disabled = treeList[i][field] === 0 ? true : false;
    setDisabledForTreeOptions(treeList[i].children, field);
    newTreeList.push(treeList[i]);
  }
  return newTreeList;
}

/**
 * @description 构造树型结构数据
 * @param data 数据源
 * @param id id字段 默认id
 * @param parentId 父节点字段，默认parentId
 * @param children 子节点字段，默认children
 * @returns 追加字段后的树
 */
export const handleTree = (
  data: any[],
  id?: string,
  parentId?: string,
  children?: string
): any => {
  if (!Array.isArray(data)) {
    console.warn("data must be an array");
    return [];
  }
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children"
  };

  const childrenListMap: any = {};
  const nodeIds: any = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: Record<string, any>) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
};

export interface Tree {
  children?: this[];
}

export function toTree<T extends Tree>(
  src: T[],
  keyField: keyof T,
  parentField: keyof T
): T[] {
  const map = new Map<unknown, T>(src.map(it => [it[keyField], it]));
  src.forEach(it => {
    if (map.has(it[parentField])) {
      const parent = map.get(it[parentField])!;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(it);
    }
  });
  return src.filter(it => !it[parentField]);
}
