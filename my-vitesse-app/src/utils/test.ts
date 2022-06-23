// const protobuf = require('protobufjs');
import protobuf from "protobufjs"
// const serializer = require('proto3-json-serializer');
import * as serializer from "proto3-json-serializer"

export function workTest() {
    const pb_struct_namespace = protobuf.common.get('google/protobuf/struct.proto');
    const pb_struct = protobuf.Root.fromJSON(pb_struct_namespace);
    const Value = pb_struct.lookupType('google.protobuf.Value');

    const json = '{"a": 1}';
    console.log(Value)
    const deserialized = serializer.fromProto3JSON(Value, json);
    console.log(deserialized);

    // const serialized = serializer.toProto3JSON(deserialized);
    // console.log(JSON.stringify(serialized));
}