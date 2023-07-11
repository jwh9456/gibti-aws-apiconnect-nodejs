import _ from "lodash";

export async function DataParser(data){
  const IPs = _.map(data,"id");
  return IPs;
}