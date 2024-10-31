/**
 * Copyright (C) by chevp
 */
#include "Renderer.h"
#include <iostream>

Renderer::Renderer()
{
}
Renderer::~Renderer() {}

void Renderer::initialize()
{
    std::cout << "Renderer initialized" << std::endl;
}

void Renderer::update(float deltaTime)
{
    std::cout << "Renderer updated with deltaTime: " << deltaTime << std::endl;
}

void Renderer::setParameter(int param)
{
    std::cout << "Renderer parameter set to: " << param << std::endl;
}

void Renderer::cleanup()
{
    std::cout << "Renderer cleanup" << std::endl;
}