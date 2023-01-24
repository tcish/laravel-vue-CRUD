<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCrudRequest;
use App\Http\Requests\UpdateCrudRequest;
use App\Http\Resources\CrudResource;
use App\Models\Crud;
use Illuminate\Http\Request;

class CrudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Crud::all();

        return CrudResource::collection($data);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCrudRequest $request)
    {
        $params = $request->all();

        Crud::create($params);

        return response()->json(['status' => "success"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Crud  $crud
     * @return \Illuminate\Http\Response
     */
    public function show(Crud $crud)
    {
        return new CrudResource($crud);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Crud  $crud
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $crudId)
    {
        $params = $request->all();

        Crud::where("id", $crudId)->update($params);

        return response()->json(['status' => "success"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Crud  $crud
     * @return \Illuminate\Http\Response
     */
    public function destroy($crudId)
    {
        Crud::where("id", $crudId)->delete();

        return response()->json(['status' => "success"]);
    }
}
